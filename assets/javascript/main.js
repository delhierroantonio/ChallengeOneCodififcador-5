// * -- ELEMENTS DECLARATIONS --

// # encode, decode and copy buttons
const encryptBtn = document.getElementById('encrypt');
const decryptBtn = document.getElementById('decrypt');
const copyBtn = document.getElementById('copy');

// # toast popup
const toastBox = document.getElementById('toastBox');
const closeIcon = document.getElementById('closeIcon');
const progressBar = document.getElementById('progressBar');

// # text-areas and inputs
const outputResult = document.getElementById('outputResult');
const textArea = document.querySelector('textarea');

const outputHidden = document.getElementById('outputResult');
const textCopy = document.getElementById('outputSection__hidden');
const copyBtnContainer = document.getElementById('outputSection__btn');
const outputImg = document.getElementById('outputSection__img');

// # error popup msg
const errorMsg = document.getElementById('errorMsg');

// # encrypt and decrypt keys
let encrypt = {
  'a': 'ai',
  'e': 'enter',
  'i': 'imes',
  'o': 'ober',
  'u': 'ufat'
}

let decrypt = {
  'ai': 'a',
  'enter': 'e',
  'imes': 'i',
  'ober': 'o',
  'ufat': 'u'
}

// # regular expression for only a-z characters
let regex = /^[a-z\s]*$/;

//  !do I really need this clear? 
textArea.value = '';

// * -- FUNCTIONS DECLARATIONS --
// copy to clipboard 'helper' func
function copyClipboard() {
  let timerToast;

  copyBtn.addEventListener('click', () => {
    outputResult.select();
    outputResult.setSelectionRange(0, 999);
    document.execCommand('copy');
    navigator.clipboard.writeText(outputResult.value);

    toastBox.classList.add('visible');

    timerToast = setTimeout(() => {
      toastBox.classList.remove('visible');
    }, 2300);
  })
  closeIcon.addEventListener('click', () => {
    toastBox.classList.remove('visible');
  }, 250);

  clearTimeout(timerToast);
  
}


function showAlert(msg) {
  alert(msg);
}

function showResult(result) {
  outputResult.innerHTML = result;
}

function encryptText() {
  let text = textArea.value.toLowerCase();
  textArea.value = '';

  // validate textarea length 
  if(text.length == 0) {
    showAlert('Upps!, parece que no hay texto por encriptar, porfavor ingresa un texto.');
  } else {
    // regular expression for string of alphabets
    if(text.match(regex)) {
      text = text.replace(/a|e|i|o|u/g, function(replacer) {
        return encrypt[replacer];
      });
      showResult(text);
    } else {
      showAlert('Solo los caracteres alfabeticos son validos.');
    }
    showHideContent();
  }
}

function decryptText() {
  let text = textArea.value.toLowerCase();
  textArea.value = "";

  if(text.length == 0) {
    showAlert('Upps!, parece que no hay texto por desencriptar, por favor ingresa un texto');
  } else {
    text = text.replace(/ai|enter|imes|ober|ufat/g, function(replacer) {
      return decrypt[replacer];
    });
    showResult(text);
  }
}

function showHideContent() {
  // outputHidden.classList.add('hidden');
  outputImg.classList.add('d-none');
  textCopy.classList.remove('hidden');
  copyBtnContainer.classList.remove('hidden');
}


// * - FUNC SETUP -
// adding functions to element objects

copyBtn.addEventListener('click', copyClipboard);
encryptBtn.addEventListener('click', encryptText);
decryptBtn.addEventListener('click', decryptText);
