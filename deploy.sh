#!/usr/bin/env bash

set -e

# = Paths =====================================================================

	declare -A users hosts dests

	users['eu-moodle']="www-file"
	hosts['eu-moodle']="eu-moodle.learnsci.com"
	dests['eu-moodle']="/var/www/moodlefile"

	users['eu-moodle-tools']="www-file"
	hosts['eu-moodle-tools']="eu-moodle-tools.learnsci.com"
	dests['eu-moodle-tools']="/var/www/moodlefile"

	users['eu-moodle-trial']="www-file"
	hosts['eu-moodle-trial']="eu-moodle-trial.learnsci.com"
	dests['eu-moodle-trial']="/var/www/moodlefile"

	users['eu-iomad']="www-file"
	hosts['eu-iomad']="eu-iomad.learnsci.com"
	dests['eu-iomad']="/var/www/moodlefile"

	users['showcase']="www-file"
	hosts['showcase']="showcase.learnsci.co.uk"
	dests['showcase']="/var/www/showcase.moodlefile"

	update="git@git.learnsci.com:labsim-deps/deploy.git"

# = Utils =====================================================================

	# print head
	H () {
		S="=== $1 $(printf '%.s=' {1..72})"
		echo -e "\n    ${S:0:72}    \n"
	}

	# print line
	L () {
		S="$(printf '%*s' $((${2-0}*4)))"
		echo -e "    ${S}${1}"
	}

	# print text
	T () {
		S="$(printf '%*s' $((${2-0}*4)))"
		echo -ne "    ${S}${1}"
	}

# = Remove ====================================================================

	if [[ $1 =~ ^remove$ ]] && [[ -n $2 ]]; then

		H "Remove $2"

		T "Are you sure? [yes/n]: " 1 && read

		[[ ! "$REPLY" =~ ^yes$ ]] && exit 1

		echo

		for key in "${!hosts[@]}"; do
			user=${users[$key]}
			host=${hosts[$key]}
			dest=${dests[$key]}
			L "Sync $host ..."; T ""
			set +e
			read -d '' cmd <<- EOF
				if [ -e '$dest/$2' ]; then
					rm -Rf '$dest/$2'
					echo 'Removed'
				else
					echo 'Not found'
				fi
			EOF
			ssh "$user@$host" "$cmd"
			set -e
		done

		H "Completed"

		exit

	fi

# = Check =====================================================================

	H "Check"

	L "[+] System Tools"

	T "Git version ... " 1
	if [[ -n $(which git) && $(git --version) =~ version.[2-9] ]];
		then echo "OK"; else echo "FAIL";
		L "Missing or old. Requires >= v2." 2; exit 1
	fi
	T "Rsync version ... " 1
	if [[ -n $(which rsync) && $(rsync --version) =~ version.[3-9] ]];
		then echo "OK"; else echo "FAIL";
		L "Missing or old. Requires >= v3." 2; exit 1
	fi

	echo

	L "[+] Git Worktree"

	T "Is repo ... " 1
	if [[ -n $(git rev-parse HEAD 2>/dev/null) ]];
		then echo "OK"; else echo "FAIL";
		L "Cannot deploy unmanaged code." 2; exit 1
	fi
	T "Is clean ... " 1
	if [[ -z $(git status --short 2>/dev/null) ]];
		then echo "OK"; else echo "FAIL";
		L "Cannot deploy uncommitted code." 2; exit 1
	fi

	echo

	L "[+] Git Remote"

	T "Fetch head ... " 1
	if [[ 0 -eq $(git fetch -q --all &>/dev/null; echo $?) ]];
		then echo "OK"; else echo "FAIL";
		L "Check your connection and auth." 2; exit 1
	fi
	T "Push tags ... " 1
	if [[ 0 -eq $(git push -q --tags &>/dev/null; echo $?) ]];
		then echo "OK"; else echo "FAIL";
		L "Check your connection and auth." 2; exit 1
	fi

	echo

	L "[+] Git Branch"

	T "Is tracked ... " 1
	if [[ -n $(git rev-parse @{u} 2>/dev/null) ]];
		then echo "OK"; else echo "FAIL";
		L "Cannot deploy untracked branch." 2; exit 1
	fi
	T "Is pushed ... " 1
	if [[ -z $(git rev-list @{u}... 2>/dev/null) ]];
		then echo "OK"; else echo "FAIL";
		L "Cannot deploy unpushed branch." 2; exit 1
	fi

	echo

	L "[+] Deploy Script"

	T "Fetch head ... " 1
	if [[ 0 -eq $(git fetch --depth=1 $update &>/dev/null; echo $?) ]];
		then echo "OK"; else echo "FAIL";
		L "Check your connection and auth." 2; exit 1
	fi
	T "Check diff ... " 1
	if [[ -z $(git diff --name-only FETCH_HEAD $BASH_SOURCE 2>/dev/null) ]];
		then echo "OK"; else echo "FAIL";
		git checkout FETCH_HEAD -- deploy.sh
		L "Updated deploy.sh please commit." 2; exit 1
	fi

# = Build =====================================================================

	H "Build"

	source "./build.sh"

	temp=$(mktemp -d)

	echo

	L "[+] Acquire 'temp'"
	if [[ -d "$temp" ]];
		then L "'$temp'" 1;
		trap "rm -Rf $temp" EXIT
		else L "FAIL" 1; exit 1
	fi

	echo

	L "[+] Snapshot 'site'"
	if [[ -d "$site" ]];
		then L "'$site' => '$temp/site/'" 1;
		cp -R "$site" "$temp/site/"
		else L "none (OK)" 1;
	fi

	echo

	L "[+] Snapshot 'meta'"
	if [[ -d "$meta" ]];
		then L "'$meta' => '$temp/meta/'" 1;
		cp -R "$meta" "$temp/meta/"
		else L "none (OK)" 1;
	fi

# = Deploy ====================================================================

	tags=$(git tag --list v* --points-at HEAD)
	refs=$(git describe --tags --always HEAD)
	branch=$(git rev-parse --abbrev-ref HEAD)
	repo=$(git remote get-url origin | tr '[:upper:]' '[:lower:]')
	path=$(printf $repo | sed -E 's|^(.+)[/](.+)[.](git)$|\2|')

	if [[ -n "$tags" && "$branch" =~ ^master|main$ ]]; then
		refs=$tags
		H "Deploy RELEASE: $refs"
		mode="rel"
		sync="rm -Rf pre && ln -s rel pre"
	fi

	if [[ -z "$tags" || ! "$branch" =~ ^master|main$ ]]; then
		refs=$refs
		H "Deploy Preview: $refs"
		mode="pre"
		sync="find -type l -path ./pre -delete"
	fi

	cat > $temp/deploy <<- EOF
		repo: $repo
		refs: $refs
		name: $(git show -s --format=%cn)
		date: $(git show -s --format=%ci)
	EOF

	for key in "${!hosts[@]}"; do
		user=${users[$key]}
		host=${hosts[$key]}
		dest=${dests[$key]}
		L "Sync $host ..."
		rsync \
			-a --delete --delay-updates --delete-delay \
			-p --chmod=D755,F644 -h --info=progress2 \
			--rsync-path="\
			mkdir -p $dest/$path && cd $dest/$path \
			&& $sync && rsync" \
			"$temp/" "$user@$host:$dest/$path/$mode"
		echo
	done

# = Completed =================================================================

	H "Completed"
