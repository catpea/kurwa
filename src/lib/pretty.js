import prettier from 'prettier';
import parserBabel from "prettier/parser-babel.js";

import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/base16/tomorrow-night.css';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);

function pretty(code, options={language:'javascript'}){


  let response = '';

  if(options.language=='javascript'){
    try{
      response = prettier.format(code, { semi: true, parser: "babel", plugins:[parserBabel] });
    }catch(e){
      response = code;
    }
  }else{
    response = code;
  }

  if(options.highlight){
    response = hljs.highlight(response, {language:options.language}).value;
  }

  return response;
}

export {pretty};
