/*********
GameInfo类[静态类]：
1.当一个游戏开始的时候，GameInfo会去请求得到游戏中所有玩家、游戏规则、游戏状态等的相关信息，
  通过Net做一次Ajax请求，来得到一个json，然后通过JsonFactory来解析出对应的信息表
2.当玩家通过Command.js操作想要得到游戏信息的时候，Command.js会直接通过访问Gameinfo类来得到相关信息
************/
