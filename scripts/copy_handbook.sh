#!/bin/sh

if [ ! -e ../handbook ]
then
    echo "Handbook repo not found (../handbook)"
    exit 0
fi

if [ ! -e src ]
then
    echo "Run this from the top of the website repository"
    exit 0
fi

cd ../handbook

for file in `find . -type f -not -path "./.*/*"`
do
     lastUpdate=$(git log -1 --pretty="format:%ci" $file)

     dir=$(dirname $file)
     dest=../website/src/handbook/$dir
     mkdir -p $dest
     destFile=../website/src/handbook/$file
     case "$file" in
         *.md)
            echo "---" > $destFile
            echo "originalPath: $file" >> $destFile
            echo "updated: $lastUpdate" >> $destFile
            echo "---" >> $destFile
            cat $file >> $destFile
            # account for .md files with --- data defined
            # remove ---\n--- with '': https://stackoverflow.com/a/1252191/193376
            sed -i "" -e ':a' -e 'N' -e '$!ba' -e 's/---\n---\n//g' $destFile
         ;;
         *)
            cp $file $destFile
         ;;
     esac
done

cd ../website
mv ./src/handbook/README.md ./src/handbook/index.md
