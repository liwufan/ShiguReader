import React, { Component } from 'react';
import '../style/ClickAndCopyText.scss';
import PropTypes from 'prop-types';
var classNames = require('classnames');
const clientUtil = require("../clientUtil");
import { toast } from 'react-toastify';


function iosCopyToClipboard(el) {
  //https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios/34046084
  var oldContentEditable = el.contentEditable,
      oldReadOnly = el.readOnly,
      range = document.createRange();

  el.contentEditable = true;
  el.readOnly = false;
  range.selectNodeContents(el);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

  el.contentEditable = oldContentEditable;
  el.readOnly = oldReadOnly;

  document.execCommand('copy');
}

export default class ClickAndCopyText extends Component {
  onTitleClick(){
    //https://stackoverflow.com/questions/49236100/copy-text-from-span-to-clipboard
    var textArea = document.createElement("textarea");
    textArea.value = this.props.text;
    document.body.appendChild(textArea);

    if(clientUtil.isIOS()){
      iosCopyToClipboard(textArea)
    }else{
      textArea.select();
      document.execCommand("Copy");
    }
    textArea.remove();

    toast('Copied to Clipboard', {
      className: "one-line-toast",
      position: "top-right",
      autoClose: 3 * 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }


  render(){
    const { text, className, ...others } = this.props;
    const cn = classNames("click-and-copy-text", className)
    return(<span onClick={this.onTitleClick.bind(this)} className={cn}>
             {this.props.text} 
            </span>)
  }
}

ClickAndCopyText.propTypes = { 
  text: PropTypes.string
};
