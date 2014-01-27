#!/bin/bash

# build-repo-for-release.sh repo version...

# The repo argument specifies a path to a local Maven repository.  If
# the repository does not exist, it will be created.
repo=$1
repoxml=$1/repo.xml

function get-version {
# Given a directory path of the form:
# .../android-native-player-public-... this function will return
# everything following the string "android-native-player-public-"
    regex=".*android-native-player-public-([^/]+)"
    path=$1

    if [[ $path =~ $regex ]]
    then
        echo ${BASH_REMATCH[1]}
    else
        echo "Invalid directory: $path; aborting..."
        exit 1
    fi
}

function install-from-file {
# Add an Android Native Player artifact to a local repository from a
# directory.  The directory will contain both an Android library (aar)
# and Java archive (jar) file.

    groupId=$1
    artifactId=$2
    version=$3
    path=$4
    echo Working on $groupId:$artifactId:$version
    echo Found at path ... $path
    file=$path/$artifactId-$version.aar
    mvn -s $repo/repo.xml install:install-file -Dfile=$file -DgroupId=$groupId -DartifactId=$artifactId \
        -Dversion=$version -Dpackaging=aar
    file=$path/$artifactId-$version.jar
    mvn -s $repo/repo.xml install:install-file -Dfile=$file -DgroupId=$groupId -DartifactId=$artifactId \
        -Dversion=$version -Dpackaging=jar
}

function install-from-nexus {
# Add an Android Native Player artifact to a local repository.

    groupId=$1
    artifactId=$2
    version=$3
    path=`echo $groupId | tr . /`/$artifactId/$version/$artifactId-$version.jar
    echo Working on $groupId:$artifactId:$version
    echo Found at path ... $path
    rm -f $artifactId.jar
    curl "http://nexus.vidmark.local:8081/nexus/content/repositories/releases/$path" -o $artifactId.jar
    mvn -s $repo/repo.xml install:install-file -Dfile=$artifactId.jar -DgroupId=$groupId -DartifactId=$artifactId \
        -Dversion=$version -Dpackaging=jar
    rm -f $artifactId.jar
}

# Process the repo, putting the path into the Maven settings file.
if [[ "$repo" == "" ]]
then
   echo "Missing repo argument"
   exit 1
elif [ ! -e $repo ]
then
    mkdir -p $repo
elif [[ ! -d $repo ]]
then
    echo "$repo exists but is not a directory." 
    exit 1
fi
echo "<settings xmlns='http://maven.apache.org/SETTINGS/1.0.0' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'" > $repoxml
echo "  xsi:schemaLocation='http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd'>" >> $repoxml
echo "  <localRepository>$repo</localRepository>" >> $repoxml
echo "</settings>" >> $repoxml

# Process the versions.
shift
for arg in $*
do
    echo Adding release $arg to the Maven repository at $repo/...

    if [[ -d $arg ]]
    then
        echo Adding a Gradle release distribution at path: $arg
        version=`get-version $arg`
        echo Installing version: $version
        install-from-file com.brightcove.player android-sdk $version $arg/sdk
        install-from-file com.brightcove.freewheel android-freewheel-plugin $version $arg/freewheel
        install-from-file com.brightcove.ima android-ima-plugin $version $arg/ima
        install-from-file com.brightcove.omniture android-omniture-plugin $version $arg/omniture
        install-from-file com.brightcove.widevine android-widevine-plugin $version $arg/widevine
        install-from-file com.brightcove.player android-hls-player $version $arg/hls
    else
        install-from-nexus com.brightcove.player android-sdk $version 
        install-from-nexus com.brightcove.freewheel android-freewheel-plugin $version 
        install-from-nexus com.brightcove.ima android-ima-plugin $version 
        install-from-nexus com.brightcove.omniture android-omniture-plugin $version 
        install-from-nexus com.brightcove.drm android-widevine-plugin $version
        install-from-nexus com.brightcove.player android-hls-player $version
    fi
done
