/*********
AI类[静态类]：
1.在用户的Event将通过EventToCommand.js被转换为Command/Command.js对象，然后被放入Command/CommandConllecter.js中等待被处理，
  当播放状态开始时，CommandConllecter通过Command/CommandToAction.js把Command转换成Action送给ActionConllecter.js,
  当ActionConllecter.js被ActionDispatcher.js一个一个分发并在ActionProcess.js执行的时候，有时会遇到半自动的智能，例如
  寻路，再次寻路，丢失目标后自动锁定策略等等。
2.NPC的逻辑会通过AI来判定下一步如何做，通过AI编辑器可以编辑AI，所以AI对象也可以被json工厂创造
************/