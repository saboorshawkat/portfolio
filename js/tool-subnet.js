  // -- subnet / CIDR calculator --
  (function subnetTool(){
  const subnetInput = document.getElementById('subnetInput');
  if(!subnetInput) return;
  function ipToInt(ip){
    const parts = ip.split('.').map(Number);
    if(parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return ((parts[0]<<24) | (parts[1]<<16) | (parts[2]<<8) | parts[3]) >>> 0;
  }
  function intToIp(int){
    return [(int>>>24)&255, (int>>>16)&255, (int>>>8)&255, int&255].join('.');
  }
  function updateSubnet(){
    const val = subnetInput.value.trim();
    const fields = ['sNet','sBcast','sMask','sWild','sRange','sHosts'];
    const match = val.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/);
    if(!match){
      fields.forEach(id => document.getElementById(id).textContent = '—');
      return;
    }
    const ip = match[1], prefix = parseInt(match[2], 10);
    const ipInt = ipToInt(ip);
    if(ipInt === null || prefix < 0 || prefix > 32){
      fields.forEach(id => document.getElementById(id).textContent = '—');
      return;
    }
    const maskInt = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const wildInt = (~maskInt) >>> 0;
    const netInt = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | wildInt) >>> 0;
    const totalHosts = prefix >= 31 ? 0 : Math.pow(2, 32 - prefix) - 2;
    const firstHost = prefix >= 31 ? netInt : netInt + 1;
    const lastHost = prefix >= 31 ? bcastInt : bcastInt - 1;

    document.getElementById('sNet').textContent = intToIp(netInt);
    document.getElementById('sBcast').textContent = intToIp(bcastInt);
    document.getElementById('sMask').textContent = intToIp(maskInt);
    document.getElementById('sWild').textContent = intToIp(wildInt);
    document.getElementById('sRange').textContent = totalHosts > 0 ? `${intToIp(firstHost)} — ${intToIp(lastHost)}` : 'n/a (point-to-point)';
    document.getElementById('sHosts').textContent = totalHosts.toLocaleString();
  }
  subnetInput.addEventListener('input', updateSubnet);
  })();
