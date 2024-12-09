const btn =document.createElement('button');
btn.onclick=function()

{
    alert("Ez egy natív kód");

}

btn.innerHTML ="Natív gomb";

document.getElementById("nativ-button-container").appendChild(btn);

 
const gomb =React.createElement(
    'button',
    {
    onClick: function() {
            alert('Klikk esemény történt');
        },
   
    },
"Gomb 2"
);
 
ReactDOM.render(gomb, document.getElementById('react-button-container'));