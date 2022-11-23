Test

required : MongoDB
you can use my docker-compose to install a version on mongodb, you myst have docker install on your desktop

to launch a mongodb instance : `docker-compose up`

to make test : `yarn test`

to use cli `bin/fleet.ts help`

To make ci i used husky : `yarn prepare`

- esltin for quality code : `yarn format`
- prettier for reformat presentation : `yarn prettier`
- cucumber for unit test: `yarn test`

for cd, we can use circleci to deploy code on the future server environnement.
