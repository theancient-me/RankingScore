# Ranking Score leaderboard
   ระบบ Score board สำหรับการเล่นเกมหรือกิจกรรมต่าง ๆ โดยแข่งขันกันเป็นทีม เพื่อใช้ในการแข่งขันเล็กๆ สำหรับมาแลกของรางวัล หรือ เอาสนุกๆ | ranking score leaderboard realtime for using game activity.
![enter image description here](https://raw.githubusercontent.com/theancient-me/RankingScore/master/img/2.png)

## ความต้องการ |Requirement

 - NodeJS 10 latest. [Doc](https://nodejs.org/en/docs/)
 - Angular7  [Doc]([https://angular.io/docs](https://angular.io/docs))
 - MongoDB.  [Doc](https://docs.mongodb.com/manual/reference/program/mongod/)

## วิธีการนำไปใช้ | Getting Started
ทำการ Clone Repo นี้ไปหรือสามารถดาวน์โหลดได้จากหน้าเว็บนี้ clone ranking score leaderboard realtime 
```
git clone https://github.com/theancient-me/RankingScore.git 
 ```
 into folder RankingScore and install dependency
1. `` cd RankingScore/backend ``
2.  `` npm install ``
3. `` cd .. ``
4. `` cd frontend``
5. `` npm install``

After `` npm install``  You can use immediately in localhost 
```
 ng serve
```

If you use with server such as pm2.
1. `` cd frontend ``
2. `` ng add @ng-toolkit/universal ``
3. `` npm run build:prod ``


## How to run 
### pm2
start backend service
``` 
cd backend
```
``` 
pm2 start index.js
```

stat frontend service
```
cd frontend
```
```
pm2 start local.js
```
