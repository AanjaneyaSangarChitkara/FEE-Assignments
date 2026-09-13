const memes=[
"meme1.jpg",
"meme2.jpg",
"meme3.jpg",
"meme4.jpg",
"meme5.jpg"
];

const meme=document.getElementById("meme");
const box=document.querySelector(".box");

box.addEventListener("click",function(){
    let random=Math.floor(Math.random()*5);
    meme.src=memes[random];
}); 