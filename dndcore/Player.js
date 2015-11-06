/*********
Player类[实例化类]：
1.保存当前PC的玩家状态，通过和game_state/GameStateDoer.js通信控制当前玩家游戏状态，
2.用来和AI做联通，Player关联了自己的unit/Role.js，作为桥梁，送给AI当前Role的属性，AI
  类运算出下一步的行为（往往AI只是简单的寻路和重新寻路），主要操作是玩家通过下拉指令给
  Command/CommandConllecter.js，当游戏进入playing阶段分发给PlayState/ActionConllecter.js
  然后通过ActionProcess.js来进行整体处理
3.记录自己或他人玩家的有用信息，得分，名头，角色，等等。
************/

