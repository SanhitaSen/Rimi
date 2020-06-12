let play = false;
let score;
let counter; 
let action;
let corrAns;
document.getElementById('submit').onclick= function()
{
    if (play == true) // if we are playing
    {
        location.reload(); // reloads the page.
       
    }
    else{ // if we aren't playing
        play=true; //on clicking button, game starts, hence play = true.
        score = 0;
        counter=60;
        //if not playing, initially set the value of inner Html score to 0 everytime.
        document.getElementById('plusScore').innerHTML = score;
        //Then, set timeRem as counter. 
        document.getElementById('timeRem').innerHTML = counter;
        show("counter");
        hide('over');
        show('score');
        //Do "Reset Game" by updating button inerHtml code
        document.getElementById('submit').innerHTML = "Reset Game";
        startCountdown();
        //Now we have to generate new questions and give multiple options as answers.
        generateQA();
        
        }
};
for (let k = 1;k<=4;k++)
{
document.getElementById("box" + k).onclick = function()
        {
            if (play==true)
            {
                if (this.innerHTML == corrAns)
                {
                    score++;
                    document.getElementById("plusScore").innerHTML = score;
                    hide("wrong");
                    show("right");
                    setTimeout(function()
                    {
                        hide("right")
                    },1000);
                    generateQA();
                }
                else
                {
                    hide("right");
                    show("wrong");
                    setTimeout(function()
                    {
                        hide("wrong");
                    },1000)
                }
            }
        }
}
//FUNCTIONS!
//Countdowns timer from 60 to 0.
function startCountdown()
{
    action = setInterval(function()
    {
        counter -=1;
        document.getElementById('timeRem').innerHTML = counter;
        if (counter==0) // game over should be shown
        {
         stopCounter();
         show("over");
         document.getElementById('fScore').innerHTML = score;
         hide("counter");
         hide("right");
         hide("wrong");
         hide("score");
         play = false;
         document.getElementById('submit').innerHTML = "Start Again!";
        }
    },1000)
}
function stopCounter()
{
    clearInterval(action);
}
function hide(id)
{
    document.getElementById(id).style.display = "none";
}
function show(id)
{
    document.getElementById(id).style.display = "block";

}
function generateQA()
{
    let a =1+ Math.round(Math.random() *9);
    let b = 1+ Math.round(Math.random() *9);
    let operator= ["X","+","-","/","%"];
    let i = Math.round(Math.random() * 4);
    if (operator[i]=="X")
    {
    document.getElementById('problem').innerHTML = a +"X" + b;
    corrAns = a*b;
    }
    else if (operator[i]=="+")
    {
        document.getElementById('problem').innerHTML = a + " " +"+" + " "+ b;
        corrAns = a+b;
    }
    else if (operator[i]=="-")
    {
        document.getElementById('problem').innerHTML = a + " " +"-" + " "+ b;
        corrAns = a-b;
    }
    else if (operator[i]=="/")
    {
        document.getElementById('problem').innerHTML = a + " " +"/" + " "+ b;
        corrAns = Math.floor(a/b);
    }
    else if (operator[i]=="%")
    {
        document.getElementById('problem').innerHTML = a + " " +"%" + " "+ b;
        corrAns = a%b;
    }
    let pos = 1+ Math.round(Math.random()*3);
    document.getElementById("box"+ pos).innerHTML = corrAns;
    let answers = [corrAns];
    //Now fill the other boxes with random wrong answers.
    for (let j=1;j<=4;j++)
    {
        if (j!==pos)
        {
            let wrongA; 
            do
            {
                wrongA = Math.round(Math.random()*50);
            }while(answers.indexOf(wrongA)>-1)
            document.getElementById("box"+ j).innerHTML = wrongA; 
            answers.push(wrongA);
        }
    }

}