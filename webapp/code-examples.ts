export const whileExample = `/**
* You can edit and run this code. 
* Tah Lang by TarekkMA
*/

//This is a simple example illustrating how you can use tah-lang
{
  val a as string = "this is a const string"
  var x as number = 1


	var i = 0
  while(i < 12){
  	var iStr = string(i)
    var mulStr = string(i * i)
  	println(iStr + " * " + iStr + " = " + mulStr)
  	i = i + 1
  }
  println("")
  
  while(i < 24) {
  	print("The number " + string(i) + " is an ")
  	if(i % 2 == 0)
    	print("even")
    else
    	print("odd")
    println(" number")
    i = i + 1
  }
  println("")
  
  while x < 50
    x = x + 8.1
  
  println(string(x)) /*Result should be 57.7*/
  
  "hello" + " " + "Tarek"
}
`;
