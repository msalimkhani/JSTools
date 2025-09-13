function runTest(){
    const key = JSTools.HideElementFromDom(".custom-p");
    setTimeout(() => {
        JSTools.RevivalElementToDom(key);
    }, 600);

    const key2 = JSTools.HideElementFromDom("#div1 h2");
    setTimeout(() => {
        JSTools.RevivalElementToDom(key2);
    }, 800);
}