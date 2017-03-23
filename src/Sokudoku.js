import React, { Component } from 'react';
import TinySegmenter from './tiny_segmenter';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';

var BSDL = `BSDライセンス
これはBSDライセンスのテンプレートです。独自のライセンスを作成するには、以下の<所有者>、<組織>、<年>を、ここに示す値から変更し、該当するものに置き換えてください。
注：BSD Unixファイルのライセンスにあった宣伝条項は、1999年7月22日、カリフォルニア大学技術ライセンス部門の責任者により正式に廃止されました。これにより、第3条"は全文削除"されたと明言されています。
したがって、新しいBSDライセンスは、末尾の謝辞文を除き、MITライセンスと同等になります。
<所有者> = カリフォルニア大学理事会
<組織> = カリフォルニア大学バークレー校
<年> = 1998
オリジナルのBSDライセンスの免責条項にある"著作権者およびコントリビューター"は、いずれも"理事会およびコントリビュータ"を意味します。

以下にライセンステンプレートを示します。

Copyright (c) <年>, <所有者>
All rights reserved.
ソースコード形式かバイナリ形式か、変更するかしないかを問わず、以下の条件を満たす場合に限り、再頒布および使用が許可されます。

ソースコードを再頒布する場合、上記の著作権表示、本条件一覧、および下記免責条項を含めること。
バイナリ形式で再頒布する場合、頒布物に付属のドキュメント等の資料に、上記の著作権表示、本条件一覧、および下記免責条項を含めること。
書面による特別の許可なしに、本ソフトウェアから派生した製品の宣伝または販売促進に、<組織>の名前またはコントリビューターの名前を使用してはならない。
本ソフトウェアは、著作権者およびコントリビューターによって「現状のまま」提供されており、明示黙示を問わず、商業的な使用可能性、および特定の目的に対する適合性に関する暗黙の保証も含め、またそれに限定されない、いかなる保証もありません。著作権者もコントリビューターも、事由のいかんを問わず、 損害発生の原因いかんを問わず、かつ責任の根拠が契約であるか厳格責任であるか（過失その他の）不法行為であるかを問わず、仮にそのような損害が発生する可能性を知らされていたとしても、本ソフトウェアの使用によって発生した（代替品または代用サービスの調達、使用の喪失、データの喪失、利益の喪失、業務の中断も含め、またそれに限定されない）直接損害、間接損害、偶発的な損害、特別損害、懲罰的損害、または結果損害について、一切責任を負わないものとします。`;

class Sokudoku extends Component {
  constructor(props) {https://jsfiddle.net/kuwa72/sadnevkf/3/#
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleUpdateInterval = this.handleUpdateInterval.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleDirection = this.handleDirection.bind(this);
    this.state = {
    	items: []
    	, text: BSDL
      , state: 'ready'
      , index: 0
      , interval: 50
      , direction: 1
      , intervalObject: null};
  }

  render() {
    var style = "div span{display: none;}";
    var base = this.state.index;
    for (var i = base - 2; i < base + 4; i++) {
    	style += "div span:nth-child("+i+"){display: inline;}";
    }
    style += "div span:nth-child("+(this.state.index + 1)+"){color: purple;font-weight: bold;}";
    return (
      <div>
        <div id="word">{this.state.items[this.state.index]}</div>
        <div id="summary">
        	{this.state.items.map(item => (
          	<span id={item}>{item}</span>
        	))}
      	</div>
        <form>
          <textarea onChange={this.handleChange} value={this.state.text} />
          speed(ms):<input type="text" onChange={this.handleUpdateInterval} value={this.state.interval}/>
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handlePause}>State:{this.state.state}</button>
          <button onClick={this.handleDirection}>Direction: {this.state.direction > 0 ? "▶" : "◀"}</button>
        </form>
        <style>
					{style}
        </style>
      </div>
    );
  }

  stopInterval() {
  	if (this.state.intervalObject != null) {
    	clearInterval(this.state.intervalObject);
    }
  }

  rebuildInterval(interval) {
  	this.stopInterval();
    return setInterval(() => this.tick(), interval);
  }

  handleChange(e) {
  	e.preventDefault();
    this.setState({text: e.target.value});
  }

  handleDirection(e) {
  	e.preventDefault();
    this.setState({direction: this.state.direction > 0 ? -1 : 1});
  }

  handleUpdateInterval(e) {
  	e.preventDefault();
    console.debug(e.target.value);
    var interval = parseInt(e.target.value,10);
    if (isNaN(interval)) {
    	interval = 20;
    }
  	this.setState({interval: interval,
    	intervalObject: this.rebuildInterval(interval)});
  }

  handleStart(e) {
  	e.preventDefault();
    var segmenter = new TinySegmenter();
    this.setState((prevState) => ({
    	index: 0,
      state: 'running',
    	items: segmenter.segment(this.state.text),
      intervalObject: this.rebuildInterval(this.state.interval)
    }));
  }

  handlePause(e) {
  	e.preventDefault();
  	if (this.state.state === 'running') {
    	this.stopInterval();
    	this.setState((prevState) => ({
      	state: 'stop',
        intervalObject: null
	    }));
    } else if (this.state.state === 'stop') {
    	this.setState((prevState) => ({
      	state: 'running',
      	intervalObject: this.rebuildInterval(this.state.interval)
	    }));
    }
  }

  tick() {
  	if (this.state.state === 'running') {
    	var nextIndex = this.state.index + this.state.direction;
      nextIndex = nextIndex < 0 ? 0 : this.state.items.length < nextIndex ? this.state.items.length : nextIndex;
			this.setState({index: nextIndex});
    }
	}
};

export default Sokudoku;
