import fs from 'node:fs';import assert from 'node:assert/strict';
const {chromium}=await import(process.argv[2]);
const browser=await chromium.launch({executablePath:chromium.executablePath(),headless:true});
try{
 const page=await browser.newPage();const results=[];
 for(const [state,port] of [['before',4320],['batch1',4321],['after',4322],['rollback',4323]]){
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.unrouteAll({behavior:'wait'});
  await page.route('**/api/products',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify([{id:'p1',name:'Keyboard'}])}));
  await page.goto(`http://127.0.0.1:${port}/catalog`);
  const button=page.getByRole('button',{name:'Add Keyboard'});await button.waitFor();await button.click();await button.click();await page.getByText('Cart: 2',{exact:true}).waitFor();
  await page.goto(`http://127.0.0.1:${port}/unknown`);await page.getByText('Not found',{exact:true}).waitFor();
  await page.unroute('**/api/products');await page.route('**/api/products',r=>r.fulfill({status:500,body:'Failed'}));await page.goto(`http://127.0.0.1:${port}/catalog`);await page.getByRole('alert').filter({hasText:'Catalog request failed'}).waitFor();assert.deepEqual(errors,[]);
  results.push({state,catalogRoute:true,apiSuccess:true,cartAfterTwoClicks:2,unknownRoute:true,apiFailure:true,pageErrors:errors});
 }
 const result={date:new Date().toISOString(),browser:await browser.version(),results};
 const file=process.argv[3];fs.writeFileSync(file,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser.close()}
