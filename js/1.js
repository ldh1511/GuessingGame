var alphabet_container=document.getElementById('alphabet_container');
var answers_container=document.getElementById('answers-container');
var btn_play=document.querySelector('.btn-play');
var btn_hint=document.querySelector('.btn-hint')
var suggestion=document.querySelector('.suggestion');
var container=document.querySelector('.container');
var turn_ele=document.querySelector('.turn');
var hint_ele=document.querySelector('.hint');
var modal_popup=document.querySelector('.modal_popup');
var nenden=document.querySelector('.nenden');
var thongtin1=document.querySelector('.thongtin1');
var ans_array, index, turn=3;
let shuffledQuestion, currentQuestionIndex;
nenden.addEventListener('click',()=>{
	modal_popup.classList.remove('active');
})
document.body.onload=function(){
	shuffledQuestion=question.sort(()=>Math.random() - 0.5);
	currentQuestionIndex=0;
	setQuestion();
	hint_ele.innerHTML="Hint: ";
}
function setQuestion(){
	resetState();
	showNextQuestion(shuffledQuestion[currentQuestionIndex]);
}
function resetState(){
	while(answers_container.firstChild){
		answers_container.removeChild(answers_container.firstChild);
	}
}
function showNextQuestion(element){
	suggestion.innerHTML=element.text;
	ans_array=element.answer.split("");
	ans_array.forEach(button=>{
		const ans_button=document.createElement('button');
		ans_button.className="answers-btn";
		ans_button.dataset.correct=button;
		answers_container.appendChild(ans_button);
	})
}
for (let i = 0; i < alphabet_container.children.length; i++) {
	alphabet_container.children[i].addEventListener('click', selectKey);
}
function selectKey(e){
	index=0;
	var answer_text
	var result="no";
	var count=0;
	var Arr_alphabet= new Array();
	if(index<answers_container.children.length && turn>0){
		index++;
		var button=e.target;
		for (let i = 0; i < ans_array.length; i++) {
			if(button.innerText==ans_array[i]){
				Arr_alphabet[i]=ans_array[i];
			}
		}
		for (let i = 0; i < answers_container.children.length; i++) {
			answers_container.children[i].innerText=(Arr_alphabet[i]==undefined)? answers_container.children[i].innerText=answers_container.children[i].innerText: answers_container.children[i].innerText=Arr_alphabet[i];
		}
		for(let i = 0; i < answers_container.children.length; i++){
			count=(answers_container.children[i].innerText!="")? count+=1: count=count;
		}
		if(Arr_alphabet.length==0 && count!=answers_container.children.length){
			turn-=1;
			turn_ele.innerHTML="You have " + turn + " turns";
			if(turn<=0){
				turn=0;
				turn_ele.innerHTML="You have " + turn + " turns";
				setTimeout(()=>{
					thongtin1.innerHTML="Game over!";
					modal_popup.classList.add('active');
				},700)
			}
		}
		else if(Arr_alphabet.length!=0 && count!=answers_container.children.length){
			turn=turn;
			turn_ele.innerHTML="You have " + turn + " turns";
		}
		else{
			turn=turn;
			turn_ele.innerHTML="You have " + turn + " turns";
			setTimeout(()=>{
				thongtin1.innerHTML="You win!";
				modal_popup.classList.add('active');
			},700)
			turn=0;
		}
	}
	else{
		e.disabled=true;
	}
}

btn_play.addEventListener('click',()=>{
	index=0;
	turn=3;
	turn_ele.innerHTML="You have " + turn + " turns";
	hint_ele.innerHTML="Hint: ";
	if(currentQuestionIndex<question.length-1){
		currentQuestionIndex++;
		setQuestion();
	}
	else{
		currentQuestionIndex=0;
		setQuestion();
	}
})
btn_hint.addEventListener('click',()=>{
	showHintQuestion(shuffledQuestion[currentQuestionIndex]);
});
function showHintQuestion(element){
	hint_ele.innerHTML="Hint: " +element.hint;
}
var question=[
	{
		text: 'Name of fast food',
		answer:'pizza',
		hint:'Start with p'
	},
	{
		text: 'Who always drives his customers away?',
		answer:'taxidriver',
		hint:'Start with t'
	},
	{
		text: 'Where can you always find money?',
		answer:'dictionary',
		hint:'Start with d'
	},
	{
		text: 'What is the longest word in the English language?',
		answer:'smiles',
		hint:'Start with s'
	}
]