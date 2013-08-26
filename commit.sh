pushd ~/projects/itchcork/
grunt
git add .
git commit . -m "fix"
git pull origin master
git push origin master
popd
exit 0

