//NB: test e2e avec PlayWright 
//il faut préalablement lancer ng-serve ou autre
Contenu de my-app/e2e/myTest.spec.ts:
------------------------------------
import { test, expect } from '@playwright/test';

test('good soustraction', async ({page}) => {
    
	//partir de index.html
	await page.goto("http://localhost:4200/ngr-basic");
	
	
	// Get an input, type data into it 
	//and verify that the value has been updated
	 await page.fill('input[name="a"]','9');
	 await page.fill('input[name="b"]','6');
     await page.click('input[type="button"][value="-"]');
	 await expect(page.locator("#spanRes")).toHaveText("3");
      
  })

  /*
installation de playwright dans un projet angular ou autre:
npm init playwright@latest
et répondre aux questions (tests or e2e or ... , yes for install playwright browsers)
=====
lancement des tests :
npx playwright test
=============
visualisation du rapport de tests:
npx playwright show-report
====
site officiel : https://playwright.dev
  */

/*
cypress vs playwright:
----
cypress fonctionne dans un navigateur (à choisir)
playwright fonctionne à l'extérieur d'un navigateur et peut par exemple lancer le test 3 fois (avec chrome , avec firefox , ...)
====
cypress existe depuis 2017
playwright existe depuis 2020
cypress est plus rapide que selenium
playwright est un petit plus rapide que cypress
cypress est assez simpple , playwright est un peu plus complexe mais aussi plus perfectionné/flexible
*/