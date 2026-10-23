'use strict';
const siteURL='https://exs290-interactives.netlify.app';
document.querySelectorAll('.card').forEach((card,index)=>{
 const link=card.querySelector('a.open'),title=card.querySelector('h2').textContent,url=siteURL+link.getAttribute('href');
 const actions=document.createElement('div');actions.className='share-actions';
 const status=document.createElement('p');status.className='share-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const fallback=document.createElement('div');fallback.className='copy-fallback';fallback.hidden=true;
 const label=document.createElement('label');label.htmlFor='share-text-'+index;
 const text=document.createElement('textarea');text.id=label.htmlFor;text.readOnly=true;text.spellcheck=false;
 fallback.append(label,text);card.append(actions,status,fallback);
 const htmlEscape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const embed=`<p><a href="${url}" target="_blank" rel="noopener">Open ${htmlEscape(title)} in a new tab</a></p>\n<iframe src="${url}" title="${htmlEscape(title)} — EXS290 interactive learning tool" width="100%" height="1200" style="width:100%;border:0;" loading="lazy"></iframe>`;
 [['Copy Link',url,'Direct link'],['Copy Canvas Embed',embed,'Canvas embed code']].forEach(([caption,value,kind])=>{
  const button=document.createElement('button');button.type='button';button.textContent=caption;button.setAttribute('aria-label',caption+' for '+title);actions.append(button);
  button.addEventListener('click',async()=>{
   fallback.hidden=true;status.textContent='';
   try{if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(value);status.textContent=kind+' copied.';}
   catch(e){label.textContent=kind+' — select and copy';text.value=value;fallback.hidden=false;text.focus();text.select();status.textContent='Automatic copying is unavailable. Copy the selected text below.';}
  });
 });
});
