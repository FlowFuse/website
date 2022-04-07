#!/bin/sh

if [ ! -e ../flowforge/docs ]
then
    echo "FlowForge Docs not found (../flowforge/docs)"
    exit 0
fi

if [ ! -e src ]
then
    echo "Run this from the top of the website repository"
    exit 0
fi

cd ../flowforge/docs

for file in `find . -type f -not -path "./.*/*"`
do
     lastUpdate=$(git log -1 --pretty="format:%ci" $file)
     version="`jq .version ../package.json`"

     dir=$(dirname $file)
     dest=../../website/src/docs/$dir
     mkdir -p $dest
     destFilename=${file/README/index}
     destFile=../../website/src/docs/$destFilename
     case "$file" in
         *.md)
            echo "---" > $destFile
            echo "updated: $lastUpdate" >> $destFile
            echo "version: $version" >> $destFile
            echo "---" >> $destFile
            cat $file >> $destFile
         ;;
         *)
            cp $file $destFile
         ;;
     esac
done

cd ../../website
