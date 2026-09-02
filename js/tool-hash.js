  // -- MD5 (compact implementation) --
  function md5(str){
    function rl(n,c){return (n<<c)|(n>>>(32-c));}
    function fn(a,b,c,d,x,s,t){a=(a+((b&c)|(~b&d))+x+t)|0;return(rl(a,s)+b)|0;}
    function gn(a,b,c,d,x,s,t){a=(a+((b&d)|(c&~d))+x+t)|0;return(rl(a,s)+b)|0;}
    function hn(a,b,c,d,x,s,t){a=(a+(b^c^d)+x+t)|0;return(rl(a,s)+b)|0;}
    function in_(a,b,c,d,x,s,t){a=(a+(c^(b|~d))+x+t)|0;return(rl(a,s)+b)|0;}
    function toWords(s){
      const n=s.length,words=[];
      for(let i=0;i<n*8;i+=8) words[i>>5]|=(s.charCodeAt(i/8)&0xff)<<(i%32);
      return words;
    }
    const x=toWords(unescape(encodeURIComponent(str)));
    const len=str.length*8;
    x[len>>5]|=0x80<<(len%32);
    x[(((len+64)>>>9)<<4)+14]=len;
    let a=1732584193,b=-271733879,c=-1732584194,d=271733878;
    for(let i=0;i<x.length;i+=16){
      const oa=a,ob=b,oc=c,od=d;
      a=fn(a,b,c,d,x[i+0]||0,7,-680876936); d=fn(d,a,b,c,x[i+1]||0,12,-389564586);
      c=fn(c,d,a,b,x[i+2]||0,17,606105819); b=fn(b,c,d,a,x[i+3]||0,22,-1044525330);
      a=fn(a,b,c,d,x[i+4]||0,7,-176418897); d=fn(d,a,b,c,x[i+5]||0,12,1200080426);
      c=fn(c,d,a,b,x[i+6]||0,17,-1473231341); b=fn(b,c,d,a,x[i+7]||0,22,-45705983);
      a=fn(a,b,c,d,x[i+8]||0,7,1770035416); d=fn(d,a,b,c,x[i+9]||0,12,-1958414417);
      c=fn(c,d,a,b,x[i+10]||0,17,-42063); b=fn(b,c,d,a,x[i+11]||0,22,-1990404162);
      a=fn(a,b,c,d,x[i+12]||0,7,1804603682); d=fn(d,a,b,c,x[i+13]||0,12,-40341101);
      c=fn(c,d,a,b,x[i+14]||0,17,-1502002290); b=fn(b,c,d,a,x[i+15]||0,22,1236535329);
      a=gn(a,b,c,d,x[i+1]||0,5,-165796510); d=gn(d,a,b,c,x[i+6]||0,9,-1069501632);
      c=gn(c,d,a,b,x[i+11]||0,14,643717713); b=gn(b,c,d,a,x[i+0]||0,20,-373897302);
      a=gn(a,b,c,d,x[i+5]||0,5,-701558691); d=gn(d,a,b,c,x[i+10]||0,9,38016083);
      c=gn(c,d,a,b,x[i+15]||0,14,-660478335); b=gn(b,c,d,a,x[i+4]||0,20,-405537848);
      a=gn(a,b,c,d,x[i+9]||0,5,568446438); d=gn(d,a,b,c,x[i+14]||0,9,-1019803690);
      c=gn(c,d,a,b,x[i+3]||0,14,-187363961); b=gn(b,c,d,a,x[i+8]||0,20,1163531501);
      a=gn(a,b,c,d,x[i+13]||0,5,-1444681467); d=gn(d,a,b,c,x[i+2]||0,9,-51403784);
      c=gn(c,d,a,b,x[i+7]||0,14,1735328473); b=gn(b,c,d,a,x[i+12]||0,20,-1926607734);
      a=hn(a,b,c,d,x[i+5]||0,4,-378558); d=hn(d,a,b,c,x[i+8]||0,11,-2022574463);
      c=hn(c,d,a,b,x[i+11]||0,16,1839030562); b=hn(b,c,d,a,x[i+14]||0,23,-35309556);
      a=hn(a,b,c,d,x[i+1]||0,4,-1530992060); d=hn(d,a,b,c,x[i+4]||0,11,1272893353);
      c=hn(c,d,a,b,x[i+7]||0,16,-155497632); b=hn(b,c,d,a,x[i+10]||0,23,-1094730640);
      a=hn(a,b,c,d,x[i+13]||0,4,681279174); d=hn(d,a,b,c,x[i+0]||0,11,-358537222);
      c=hn(c,d,a,b,x[i+3]||0,16,-722521979); b=hn(b,c,d,a,x[i+6]||0,23,76029189);
      a=hn(a,b,c,d,x[i+9]||0,4,-640364487); d=hn(d,a,b,c,x[i+12]||0,11,-421815835);
      c=hn(c,d,a,b,x[i+15]||0,16,530742520); b=hn(b,c,d,a,x[i+2]||0,23,-995338651);
      a=in_(a,b,c,d,x[i+0]||0,6,-198630844); d=in_(d,a,b,c,x[i+7]||0,10,1126891415);
      c=in_(c,d,a,b,x[i+14]||0,15,-1416354905); b=in_(b,c,d,a,x[i+5]||0,21,-57434055);
      a=in_(a,b,c,d,x[i+12]||0,6,1700485571); d=in_(d,a,b,c,x[i+3]||0,10,-1894986606);
      c=in_(c,d,a,b,x[i+10]||0,15,-1051523); b=in_(b,c,d,a,x[i+1]||0,21,-2054922799);
      a=in_(a,b,c,d,x[i+8]||0,6,1873313359); d=in_(d,a,b,c,x[i+15]||0,10,-30611744);
      c=in_(c,d,a,b,x[i+6]||0,15,-1560198380); b=in_(b,c,d,a,x[i+13]||0,21,1309151649);
      a=in_(a,b,c,d,x[i+4]||0,6,-145523070); d=in_(d,a,b,c,x[i+11]||0,10,-1120210379);
      c=in_(c,d,a,b,x[i+2]||0,15,718787259); b=in_(b,c,d,a,x[i+9]||0,21,-343485551);
      a=(a+oa)|0; b=(b+ob)|0; c=(c+oc)|0; d=(d+od)|0;
    }
    function toHex(n){
      let s='';
      for(let i=0;i<4;i++) s+=((n>>(i*8))&0xff).toString(16).padStart(2,'0');
      return s;
    }
    return toHex(a)+toHex(b)+toHex(c)+toHex(d);
  }

  // -- hash tool --
  (function hashTool(){
  const hashInput = document.getElementById('hashInput');
  const hashSha256El = document.getElementById('hashSha256');
  const hashMd5El = document.getElementById('hashMd5');
  if(!hashInput || !hashSha256El || !hashMd5El) return;
  async function updateHashes(){
    const val = hashInput.value;
    if(!val){ hashSha256El.textContent='—'; hashMd5El.textContent='—'; return; }
    hashMd5El.textContent = md5(val);
    try{
      const enc = new TextEncoder().encode(val);
      const buf = await crypto.subtle.digest('SHA-256', enc);
      const hex = Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
      hashSha256El.textContent = hex;
    }catch(e){ hashSha256El.textContent = 'unavailable'; }
  }
  hashInput.addEventListener('input', updateHashes);
  })();
