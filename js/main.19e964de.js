(()=>{"use strict";var e={491:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(645),i=n.n(r),o=n(667),a=n.n(o),s=n(825),u=n(765),l=i()((function(e){return e[1]})),p=a()(s.Z),c=a()(u.Z);l.push([e.id,"body {\n  margin: 0;\n}\n\n.cm-red_wavy_line {\n  background: url(https://try.kotlinlang.org/static/images/wavyline-red.gif)\n    repeat-x 100% 100%;\n  padding-bottom: 2px;\n}\n\n.gutter {\n  background-color: #eee;\n\n  background-repeat: no-repeat;\n  background-position: 50%;\n}\n\n.gutter.gutter-horizontal {\n  background-image: url("+p+");\n  cursor: col-resize;\n}\n\n.gutter.gutter-vertical {\n  background-image: url("+c+");\n  cursor: row-resize;\n}\n.CodeMirror {\n  border: 1px solid #eee;\n  height: 100%;\n}\n\nhtml,\nbody {\n  height: 100%;\n}\n",""]);const h=l},765:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"98604ef1a5065a065f3530d37af8364b.png"},825:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"5e6d1df402c3bc10ecc62407004bb95e.png"},705:(e,t,n)=>{var r,i=function(){function e(e,t){this.message=t,this.span=e}return e.prototype.toString=function(){return this.message},e}(),o=function(){function e(e,t){this.start=e,this.length=t}return Object.defineProperty(e.prototype,"end",{get:function(){return this.start+this.length},enumerable:!1,configurable:!0}),e}();!function(e){e[e.WhiteSpace=0]="WhiteSpace",e[e.Comment=1]="Comment",e[e.Number=2]="Number",e[e.String=3]="String",e[e.Plus=4]="Plus",e[e.Minus=5]="Minus",e[e.Star=6]="Star",e[e.Slash=7]="Slash",e[e.Bang=8]="Bang",e[e.BangEqal=9]="BangEqal",e[e.False=10]="False",e[e.True=11]="True",e[e.Equal=12]="Equal",e[e.EqualEqual=13]="EqualEqual",e[e.AndAnd=14]="AndAnd",e[e.PipePipe=15]="PipePipe",e[e.OpenParenthesis=16]="OpenParenthesis",e[e.CloseParenthesis=17]="CloseParenthesis",e[e.OpenBrace=18]="OpenBrace",e[e.CloseBrace=19]="CloseBrace",e[e.StringKeyword=20]="StringKeyword",e[e.NumberKeyword=21]="NumberKeyword",e[e.BooleanKeyword=22]="BooleanKeyword",e[e.Identifier=23]="Identifier",e[e.EndOfFile=24]="EndOfFile",e[e.BadChar=25]="BadChar",e[e.AsKeyword=26]="AsKeyword",e[e.VarKeyword=27]="VarKeyword",e[e.ValKeyword=28]="ValKeyword",e[e.Less=29]="Less",e[e.GreaterEqal=30]="GreaterEqal",e[e.LessEqal=31]="LessEqal",e[e.Greater=32]="Greater",e[e.IfKeyword=33]="IfKeyword",e[e.WhileKeyword=34]="WhileKeyword",e[e.ElseKeyword=35]="ElseKeyword"}(r||(r={}));var a,s,u=function(){function e(e,t,n){this.type=t,this.name=r[this.type],this.position=e,this.text=n}return Object.defineProperty(e.prototype,"children",{get:function(){if(this.text)return[{name:this.text}]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"textSpan",{get:function(){var e;return new o(this.position,(null===(e=this.text)||void 0===e?void 0:e.length)||0)},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return"["+r[this.type]+"]@"+this.position+" text:'"+this.text},e}(),l=(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),p=function(){},c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t}(p),h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.textSpan=new o(0,0),t.name="ExpressionStub",t}return l(t,e),Object.defineProperty(t.prototype,"children",{get:function(){},enumerable:!1,configurable:!0}),t}(c),f=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t}(p),d=function(e){function t(t,n){var r=e.call(this)||this;return r.value=t,r.literalToken=n,r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return this.literalToken.textSpan},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.literalToken]},enumerable:!1,configurable:!0}),t}(c),y=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.name="StringLiteralExpression",r}return l(t,e),t}(d),b=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.name="NumberLiteralExpression",r}return l(t,e),t}(d),m=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.name="BooleanLiteralExpression",r}return l(t,e),t}(d),g=function(e){function t(t,n,r){var i=e.call(this)||this;return i.left=t,i.oprator=n,i.right=r,i.name="BinaryExpression",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.left.textSpan.start,this.right.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.left,this.oprator,this.right]},enumerable:!1,configurable:!0}),t}(c),v=function(e){function t(t,n){var r=e.call(this)||this;return r.operator=t,r.operand=n,r.name="UnaryExpression",r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.operator.textSpan.start,this.operand.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.operator,this.operand]},enumerable:!1,configurable:!0}),t}(c),w=function(e){function t(t,n,r){var i=e.call(this)||this;return i.openParenthesisToken=t,i.expression=n,i.closeParenthesisToken=r,i.name="ParenthesizedExpression",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.openParenthesisToken.textSpan.start,this.openParenthesisToken.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.openParenthesisToken,this.expression,this.closeParenthesisToken]},enumerable:!1,configurable:!0}),t}(c),x=function(e){function t(t,n,r){var i=e.call(this)||this;return i.identifier=t,i.equalsToken=n,i.expression=r,i.name="AssignmentExpression",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.identifier.textSpan.start,this.expression.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.identifier,this.equalsToken,this.expression]},enumerable:!1,configurable:!0}),t}(c),S=function(e){function t(t){var n=e.call(this)||this;return n.identifier=t,n.name="NameExpression",n}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return this.identifier.textSpan},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.identifier]},enumerable:!1,configurable:!0}),t}(c),E=function(e){function t(t,n,r){var i=e.call(this)||this;return i.openBraceToken=t,i.statements=n,i.closeBraceToken=r,i.name="BlockStatement",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.openBraceToken.textSpan.start,this.closeBraceToken.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a];return r}([this.openBraceToken],this.statements,[this.closeBraceToken])},enumerable:!1,configurable:!0}),t}(f),T=function(e){function t(t){var n=e.call(this)||this;return n.expression=t,n.name="ExpressionStatement",n}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return this.expression.textSpan},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.expression]},enumerable:!1,configurable:!0}),t}(f),k=function(e){function t(t,n,r,i){var o=e.call(this)||this;return o.keywordToken=t,o.identifier=n,o.asTypePart=r,o.initializerPart=i,o.name="VariableDeclarationStatement",o}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){var e,t,n=this.keywordToken.textSpan.start,r=(null===(e=this.initializerPart)||void 0===e?void 0:e.textSpan.end)||(null===(t=this.asTypePart)||void 0===t?void 0:t.textSpan.end)||this.identifier.textSpan.end;return new o(n,r)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){var e,t;return[this.keywordToken,this.identifier].concat((null===(e=this.asTypePart)||void 0===e?void 0:e.children)||[],(null===(t=this.initializerPart)||void 0===t?void 0:t.initializer)||[])},enumerable:!1,configurable:!0}),t}(f),B=function(e){function t(t,n){var r=e.call(this)||this;return r.equalsToken=t,r.initializer=n,r.name="VariableDeclarationInitalizerPart",r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.equalsToken.textSpan.start,this.initializer.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.equalsToken,this.initializer]},enumerable:!1,configurable:!0}),t}(p),P=function(e){function t(t,n){var r=e.call(this)||this;return r.asKeywordToken=t,r.typeToken=n,r.name="VariableDeclarationAsTypePart",r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.asKeywordToken.textSpan.start,this.typeToken.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.asKeywordToken,this.typeToken]},enumerable:!1,configurable:!0}),t}(p),O=function(e){function t(t,n,r,i){var o=e.call(this)||this;return o.ifKeyword=t,o.condition=n,o.thenStatement=r,o.elseClause=i,o.name="IfStatement",o}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){var e;return new o(this.ifKeyword.textSpan.start,(null===(e=this.elseClause)||void 0===e?void 0:e.textSpan.end)||this.thenStatement.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.ifKeyword,this.condition,this.thenStatement].concat(this.elseClause?this.elseClause:[])},enumerable:!1,configurable:!0}),t}(f),q=function(e){function t(t,n){var r=e.call(this)||this;return r.elseKeyword=t,r.elseStatement=n,r.name="ElseClause",r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.elseKeyword.textSpan.start,this.elseStatement.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.elseKeyword,this.elseStatement]},enumerable:!1,configurable:!0}),t}(p),N=function(e){function t(t,n,r){var i=e.call(this)||this;return i.whileKeyword=t,i.condition=n,i.body=r,i.name="WhileStatement",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return new o(this.whileKeyword.textSpan.start,this.body.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.whileKeyword,this.condition,this.body]},enumerable:!1,configurable:!0}),t}(f);!function(e){e[e.Number=0]="Number",e[e.String=1]="String",e[e.Boolean=2]="Boolean"}(s||(s={}));var K,j=function(e,t,n){this.isReadOnly=e,this.name=t,this.type=n},L=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),A=function(){},C=function(){},_=function(e){function t(t){var n=e.call(this)||this;return n.value=t,n}return L(t,e),t}(A),I=function(e){function t(t){var n=e.call(this,t)||this;return n.type=s.String,n}return L(t,e),t}(_),V=function(e){function t(t){var n=e.call(this,t)||this;return n.type=s.Number,n}return L(t,e),t}(_),z=function(e){function t(t){var n=e.call(this,t)||this;return n.type=s.Boolean,n}return L(t,e),t}(_),U=function(e){function t(t,n,r){var i=e.call(this)||this;return i.left=t,i.operator=n,i.right=r,i}return L(t,e),Object.defineProperty(t.prototype,"type",{get:function(){return this.operator.resultType},enumerable:!1,configurable:!0}),t}(A),G=function(e){function t(t,n){var r=e.call(this)||this;return r.oprator=t,r.operand=n,r}return L(t,e),Object.defineProperty(t.prototype,"type",{get:function(){return this.oprator.resultType},enumerable:!1,configurable:!0}),t}(A),M=function(e){function t(t,n){var r=e.call(this)||this;return r.variable=t,r.expression=n,r}return L(t,e),Object.defineProperty(t.prototype,"type",{get:function(){return this.expression.type},enumerable:!1,configurable:!0}),t}(A),W=function(e){function t(t){var n=e.call(this)||this;return n.variable=t,n}return L(t,e),Object.defineProperty(t.prototype,"type",{get:function(){return this.variable.type},enumerable:!1,configurable:!0}),t}(A),D=function(e){function t(t){var n=e.call(this)||this;return n.statements=t,n}return L(t,e),t}(C),F=function(e){function t(t){var n=e.call(this)||this;return n.expression=t,n}return L(t,e),t}(C),Z=function(e){function t(t,n){var r=e.call(this)||this;return r.variable=t,r.initializer=n,r}return L(t,e),t}(C),R=function(e){function t(t,n,r){var i=e.call(this)||this;return i.condition=t,i.thenStatement=n,i.elseStatement=r,i}return L(t,e),t}(C),H=function(e){function t(t,n){var r=e.call(this)||this;return r.condition=t,r.body=n,r}return L(t,e),t}(C);!function(e){e[e.Addition=0]="Addition",e[e.Subtraction=1]="Subtraction",e[e.Multiplication=2]="Multiplication",e[e.Division=3]="Division",e[e.LogicalAnd=4]="LogicalAnd",e[e.LogicalOr=5]="LogicalOr",e[e.Equals=6]="Equals",e[e.NotEquals=7]="NotEquals",e[e.LessThan=8]="LessThan",e[e.LessThanOrEqualsTo=9]="LessThanOrEqualsTo",e[e.GreaterThan=10]="GreaterThan",e[e.GreaterThanOrEqualsTo=11]="GreaterThanOrEqualsTo",e[e.Concatination=12]="Concatination"}(K||(K={}));var Y,J=function(){function e(e,t,n,r,i){this.operatorTokenType=e,this.kind=t,this.leftType=n,this.rightType=r,this.resultType=i}return e.tryBind=function(e,t,n){for(var r=0;r<this.operators.length;r++){var i=this.operators[r];if(i.operatorTokenType==e&&i.leftType==t&&i.rightType==n)return i}return null},e.operators=[new e(r.Plus,K.Addition,s.Number,s.Number,s.Number),new e(r.Minus,K.Subtraction,s.Number,s.Number,s.Number),new e(r.Star,K.Multiplication,s.Number,s.Number,s.Number),new e(r.Slash,K.Division,s.Number,s.Number,s.Number),new e(r.EqualEqual,K.Equals,s.Number,s.Number,s.Boolean),new e(r.BangEqal,K.NotEquals,s.Number,s.Number,s.Boolean),new e(r.Less,K.LessThan,s.Number,s.Number,s.Boolean),new e(r.LessEqal,K.LessThanOrEqualsTo,s.Number,s.Number,s.Boolean),new e(r.Greater,K.GreaterThan,s.Number,s.Number,s.Boolean),new e(r.GreaterEqal,K.GreaterThanOrEqualsTo,s.Number,s.Number,s.Boolean),new e(r.AndAnd,K.LogicalAnd,s.Boolean,s.Boolean,s.Boolean),new e(r.PipePipe,K.LogicalOr,s.Boolean,s.Boolean,s.Boolean),new e(r.EqualEqual,K.Equals,s.Boolean,s.Boolean,s.Boolean),new e(r.BangEqal,K.NotEquals,s.Boolean,s.Boolean,s.Boolean),new e(r.Plus,K.Concatination,s.String,s.String,s.String),new e(r.EqualEqual,K.Equals,s.String,s.String,s.Boolean)],e}();!function(e){e[e.Identity=0]="Identity",e[e.Negation=1]="Negation",e[e.LogicalNegation=2]="LogicalNegation"}(Y||(Y={}));var Q=function(){function e(e,t,n,r){this.operatorTokenType=e,this.kind=t,this.operandType=n,this.resultType=r}return e.tryBind=function(e,t){for(var n=0;n<this.operators.length;n++){var r=this.operators[n];if(r.operatorTokenType==e&&r.operandType==t)return r}return null},e.operators=[new e(r.Plus,Y.Identity,s.Number,s.Number),new e(r.Minus,Y.Negation,s.Number,s.Number),new e(r.Bang,Y.LogicalNegation,s.Boolean,s.Boolean)],e}(),X=function(e,t,n,r){this.diagnostics=e,this.variables=t,this.statement=n,this.previous=r},$=function(){function e(e){this.variables=new Map,this.parent=e}return e.prototype.tryDeclare=function(e){return!this.variables.has(e.name)&&(this.variables.set(e.name,e),!0)},e.prototype.tryLookup=function(e){return this.variables.has(e)?this.variables.get(e):null==this.parent?null:this.parent.tryLookup(e)},e.prototype.getDeclaredVariables=function(){return Array.from(this.variables.values())},e}(),ee=function(){function e(e){this.diagnostics=[],this.scope=new $(e)}return e.bindGlobalScope=function(t,n){var r,i=new e(this.createParentScope(n)),o=i.bindStatement(t.statement),a=(null===(r=i.scope)||void 0===r?void 0:r.getDeclaredVariables())||[],s=((null==n?void 0:n.diagnostics)||[]).concat(i.diagnostics);return new X(s,a,o,n)},e.createParentScope=function(e){for(var t=[];null!=e;)t.push(e),e=e.previous;for(var n=void 0;t.length>0;){e=t.pop();for(var r=new $(n),i=0,o=(null==e?void 0:e.variables)||[];i<o.length;i++){var a=o[i];r.tryDeclare(a)}n=r}return n},e.prototype.bindStatement=function(e){if(e instanceof E)return this.bindBlockStatement(e);if(e instanceof k)return this.bindVariableDeclarationStatement(e);if(e instanceof T)return this.bindExpressionStatement(e);if(e instanceof O)return this.bindIfStatement(e);if(e instanceof N)return this.bindWhileStatement(e);throw new Error('Unexprected statement type "'+e.constructor.name+'"')},e.prototype.bindBlockStatement=function(e){var t=[];this.scope=new $(this.scope);for(var n=0,r=e.statements;n<r.length;n++){var i=r[n],o=this.bindStatement(i);t.push(o)}return this.scope=this.scope.parent,new D(t)},e.prototype.bindVariableDeclarationStatement=function(e){var t,n,o=e.identifier.text,a=e.keywordToken.type==r.ValKeyword,u=e.initializerPart?this.bindExpression(e.initializerPart.initializer):void 0;if(null!=e.asTypePart){var l=function(e){switch(e){case r.NumberKeyword:return s.Number;case r.StringKeyword:return s.String;case r.BooleanKeyword:return s.Boolean}throw new Error("Unkown token type "+r[e])}(e.asTypePart.typeToken.type);null!=u&&u.type!=l&&this.diagnostics.push(new i(e.initializerPart.equalsToken.textSpan,s[u.type]+" cannot be assigned to a variable of type "+s[l])),n=l}else null!=u&&(n=u.type);var p=new j(a,o,n);return(null===(t=this.scope)||void 0===t?void 0:t.tryDeclare(p))||this.diagnostics.push(new i(e.identifier.textSpan,"Variable with the name "+o+" already declared")),new Z(p,u)},e.prototype.bindExpressionStatement=function(e){var t=this.bindExpression(e.expression);return new F(t)},e.prototype.bindIfStatement=function(e){var t=this.bindExpressionWithExpectedType(e.condition,s.Boolean),n=this.bindStatement(e.thenStatement),r=e.elseClause?this.bindStatement(e.elseClause.elseStatement):void 0;return new R(t,n,r)},e.prototype.bindWhileStatement=function(e){var t=this.bindExpressionWithExpectedType(e.condition,s.Boolean),n=this.bindStatement(e.body);return new H(t,n)},e.prototype.bindExpressionWithExpectedType=function(e,t){var n=this.bindExpression(e);return n.type!=t&&this.diagnostics.push(new i(e.textSpan,"expected the expression to evaluate to "+s[t]+" but it did evaluate to "+s[n.type]+".")),n},e.prototype.bindExpression=function(e){if(e instanceof w)return this.bindParenthesizedExpression(e);if(e instanceof d)return this.bindLiteralExpression(e);if(e instanceof S)return this.bindNameExpression(e);if(e instanceof x)return this.bindAssignmentExpression(e);if(e instanceof v)return this.bindUnaryExpression(e);if(e instanceof g)return this.bindBinaryExpression(e);throw new Error("Unexpected expression type "+e.constructor.name)},e.prototype.bindParenthesizedExpression=function(e){return this.bindExpression(e.expression)},e.prototype.bindLiteralExpression=function(e){if(e instanceof y)return new I(e.value);if(e instanceof b)return new V(e.value);if(e instanceof m)return new z(e.value);throw new Error("Unexpected literal expression type "+e.constructor.name)},e.prototype.bindNameExpression=function(e){var t,n,r,o=e.identifier.text;return null==(r=null!==(n=null===(t=this.scope)||void 0===t?void 0:t.tryLookup(o))&&void 0!==n?n:null)?(this.diagnostics.push(new i(e.identifier.textSpan,"Cannot find a variable with the name "+o+".")),new V(0)):new W(r)},e.prototype.bindAssignmentExpression=function(e){var t,n,r,o=e.identifier.text,a=this.bindExpression(e.expression);return null==(r=null!==(n=null===(t=this.scope)||void 0===t?void 0:t.tryLookup(o))&&void 0!==n?n:null)?(this.diagnostics.push(new i(e.identifier.textSpan,"Cannot find a variable with the name "+o+".")),a):(r.isReadOnly&&this.diagnostics.push(new i(e.identifier.textSpan,o+" is a read only variable.")),a.type!=r.type?(this.diagnostics.push(new i(e.identifier.textSpan,s[a.type]+" cannot be assigned to a variable of type "+s[r.type])),a):new M(r,a))},e.prototype.bindUnaryExpression=function(e){var t=this.bindExpression(e.operand),n=Q.tryBind(e.operator.type,t.type);return null==n?(this.diagnostics.push(new i(e.operator.textSpan,"Unary operator '"+e.operator.text+"' is not defined for type "+s[t.type]+".")),t):new G(n,t)},e.prototype.bindBinaryExpression=function(e){var t=this.bindExpression(e.left),n=this.bindExpression(e.right),r=J.tryBind(e.oprator.type,t.type,n.type);return null==r?(this.diagnostics.push(new i(e.oprator.textSpan,"Binary operator '"+e.oprator.text+"' is not defined for types "+s[t.type]+" and "+s[n.type]+".")),t):new U(t,r,n)},e}(),te=function(){function e(e,t){this.root=e,this.variables=t}return e.prototype.evaluate=function(){return this.evaluateStatement(this.root),this.lastValue},e.prototype.evaluateStatement=function(e){if(e instanceof D)this.evaluateBoundBlockStatement(e);else if(e instanceof Z)this.evaluateBoundVariableDeclarationStatement(e);else if(e instanceof F)this.evaluateExpressionStatement(e);else if(e instanceof R)this.evaluateBoundIfStatement(e);else{if(!(e instanceof H))throw new Error("Unexpexted statemnt "+e.constructor.name);this.evaluateBoundWhileStatement(e)}},e.prototype.evaluateBoundWhileStatement=function(e){for(;this.evaluateExpression(e.condition);)this.evaluateStatement(e.body)},e.prototype.evaluateBoundIfStatement=function(e){this.evaluateExpression(e.condition)?this.evaluateStatement(e.thenStatement):null!=e.elseStatement&&this.evaluateStatement(e.elseStatement)},e.prototype.evaluateBoundBlockStatement=function(e){for(var t=0,n=e.statements;t<n.length;t++){var r=n[t];this.evaluateStatement(r)}},e.prototype.evaluateBoundVariableDeclarationStatement=function(e){var t=e.initializer?this.evaluateExpression(e.initializer):void 0;this.variables.set(e.variable,t),this.lastValue=t},e.prototype.evaluateExpressionStatement=function(e){this.lastValue=this.evaluateExpression(e.expression)},e.prototype.evaluateExpression=function(e){if(e instanceof _)return this.evaluateBoundLiteralExpression(e);if(e instanceof W)return this.evaluateBoundVariableExpression(e);if(e instanceof M)return this.evaluateBoundAssignmentExpression(e);if(e instanceof G)return this.evaluateBoundUnaryExpression(e);if(e instanceof U)return this.evaluateBoundBinaryExpression(e);throw new Error("Unexpexted expression "+e.constructor.name)},e.prototype.evaluateBoundLiteralExpression=function(e){return e.value},e.prototype.evaluateBoundVariableExpression=function(e){return this.variables.get(e.variable)},e.prototype.evaluateBoundAssignmentExpression=function(e){var t=this.evaluateExpression(e.expression);return this.variables.set(e.variable,t),t},e.prototype.evaluateBoundUnaryExpression=function(e){var t=this.evaluateExpression(e.operand);switch(e.oprator.kind){case Y.Identity:return t;case Y.Negation:return-t;case Y.LogicalNegation:return!t;default:throw new Error("Unexpected unary operator "+Y[e.oprator.kind])}},e.prototype.evaluateBoundBinaryExpression=function(e){var t=this.evaluateExpression(e.left),n=this.evaluateExpression(e.right);switch(e.operator.kind){case K.Addition:return t+n;case K.Subtraction:return t-n;case K.Multiplication:return t*n;case K.Division:return t/n;case K.LogicalAnd:return t&&n;case K.LogicalOr:return t||n;case K.Equals:return t==n;case K.Addition:return t!=n;case K.LessThan:return t<n;case K.GreaterThan:return t>n;case K.LessThanOrEqualsTo:return t<=n;case K.GreaterThanOrEqualsTo:return t>=n;case K.Concatination:return t+n;default:throw new Error("Unexpected unary operator "+K[e.operator.kind])}},e}(),ne=function(e,t){this.diagnostics=e,this.value=t},re=function(){function e(e,t){this.syntaxTree=e,this.previous=t}return Object.defineProperty(e.prototype,"globalScope",{get:function(){var e;return null==this._globalScope&&(this._globalScope=ee.bindGlobalScope(this.syntaxTree.root,null===(e=this.previous)||void 0===e?void 0:e.globalScope)),this._globalScope},enumerable:!1,configurable:!0}),e.prototype.continueWith=function(t){return new e(t,this)},e.prototype.evaluate=function(e){var t=this.syntaxTree.diagnostics.concat(this.globalScope.diagnostics);if(t.length)return new ne(t,null);var n=new te(this.globalScope.statement,e).evaluate();return new ne([],n)},e}(),ie=function(e,t){this.pattern=e,this.tokenType=t},oe=[new ie(/^\s+/,r.WhiteSpace),new ie(/^\/\/.*/,r.Comment),new ie(/^\/\*((.|\s)*?)\*\//,r.Comment),new ie(/^[0-9]+(\.[0-9]+){0,1}/,r.Number),new ie(/^var/,r.VarKeyword),new ie(/^val/,r.ValKeyword),new ie(/^as/,r.AsKeyword),new ie(/^if/,r.IfKeyword),new ie(/^else/,r.ElseKeyword),new ie(/^while/,r.WhileKeyword),new ie(/^string/,r.StringKeyword),new ie(/^number/,r.NumberKeyword),new ie(/^boolean/,r.BooleanKeyword),new ie(/^true/,r.True),new ie(/^false/,r.False),new ie(/^\<\=/,r.LessEqal),new ie(/^\>\=/,r.GreaterEqal),new ie(/^\</,r.Less),new ie(/^\>/,r.Greater),new ie(/^\!\=/,r.BangEqal),new ie(/^\!/,r.Bang),new ie(/^\=\=/,r.EqualEqual),new ie(/^\&\&/,r.AndAnd),new ie(/^\|\|/,r.PipePipe),new ie(/^\=/,r.Equal),new ie(/^\+/,r.Plus),new ie(/^\+/,r.Plus),new ie(/^\-/,r.Minus),new ie(/^\//,r.Slash),new ie(/^\*/,r.Star),new ie(/^\(/,r.OpenParenthesis),new ie(/^\)/,r.CloseParenthesis),new ie(/^\{/,r.OpenBrace),new ie(/^\}/,r.CloseBrace),new ie(/^((\"[^\"]*\")|(\'[^\']*\'))/,r.String),new ie(/^[a-zA-Z_][a-zA-Z_0-9]*/,r.Identifier)];const ae=function(){function e(e){this.position=0,this.diagnostics=[],this.codeString=e}return e.prototype.current=function(){return this.position>=this.codeString.length?"\0":this.codeString[this.position]},e.prototype.lex=function(){if("\0"==this.current())return new u(this.codeString.length,r.EndOfFile,"\0");for(var e=this.codeString.substring(this.position),t=0;t<oe.length;t++){var n=oe[t],o=n.pattern.exec(e);if(null!=o){var a=o[0],s=this.position;return this.position+=a.length,new u(s,n.tokenType,o[0])}}var l=this.current(),p=this.position,c=new u(p,r.BadChar,l);return this.diagnostics.push(new i(c.textSpan,"Bad character input: "+l)),this.position++,c},e}();var se=function(){function e(){}return e.getUnaryOperatorPrecedence=function(e){switch(e){case r.Plus:case r.Minus:case r.Bang:return 6;default:return null}},e.getBinaryOperatorPrecedence=function(e){switch(e){case r.Star:case r.Slash:return 5;case r.Plus:case r.Minus:return 4;case r.BangEqal:case r.EqualEqual:case r.Less:case r.LessEqal:case r.Greater:case r.GreaterEqal:return 3;case r.AndAnd:return 2;case r.PipePipe:return 1;default:return null}},e.getTypeName=function(e){return r[e]},e.getTypesKeywords=function(){return[r.StringKeyword,r.NumberKeyword,r.BooleanKeyword]},e.getUnaryOpertors=function(){return[r.Plus,r.Minus,r.Bang]},e.getBinaryOpertors=function(){return[r.Star,r.Slash,r.Plus,r.Minus,r.BangEqal,r.EqualEqual,r.Less,r.LessEqal,r.Greater,r.GreaterEqal,r.AndAnd,r.PipePipe]},e.getAllOpertors=function(){return this.getBinaryOpertors().concat(this.getUnaryOpertors())},e}(),ue=function(e){this.statement=e};const le=function(){function e(e){var t;this.position=0,this.diagnostics=[];var n,i=[],o=new ae(e);do{n=o.lex(),0==[r.WhiteSpace,r.BadChar,r.Comment].includes(n.type)&&i.push(n)}while(n.type!=r.EndOfFile);this.tokens=i,(t=this.diagnostics).push.apply(t,o.diagnostics)}return e.prototype.peek=function(e){var t=this.position+e;return t>=this.tokens.length?this.tokens[this.tokens.length-1]:this.tokens[t]},Object.defineProperty(e.prototype,"current",{get:function(){return this.peek(0)},enumerable:!1,configurable:!0}),e.prototype.nextToken=function(){var e=this.current;return this.position++,e},e.prototype.matchToken=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e.includes(this.current.type)?this.nextToken():(this.diagnostics.push(new i(this.current.textSpan,"Unexpected token <"+se.getTypeName(this.current.type)+">, expected "+e.map((function(e){return"<"+se.getTypeName(e)+">"})).join(" or ")+".")),new u(this.current.position,e[0]))},e.prototype.parseCompilationUnit=function(){var e=this.parseStatement();return this.matchToken(r.EndOfFile),new ue(e)},e.prototype.parseStatement=function(){switch(this.current.type){case r.OpenBrace:return this.parseBlockStatement();case r.ValKeyword:case r.VarKeyword:return this.parseVariableDeclarationStatement();case r.IfKeyword:return this.parseIfStatement();case r.WhileKeyword:return this.parseWhileStatement();default:return this.parseExpressionStatement()}},e.prototype.parseBlockStatement=function(){for(var e=Array(),t=this.matchToken(r.OpenBrace);0==[r.EndOfFile,r.CloseBrace].includes(this.current.type);){var n=this.parseStatement();e.push(n)}var i=this.matchToken(r.CloseBrace);return new E(t,e,i)},e.prototype.parseVariableDeclarationStatement=function(){var e=this.matchToken(r.VarKeyword,r.ValKeyword),t=e.type==r.ValKeyword,n=this.matchToken(r.Identifier),o=void 0,a=void 0;if(this.current.type==r.AsKeyword){var s=this.matchToken(r.AsKeyword),u=this.matchToken.apply(this,se.getTypesKeywords());o=new P(s,u)}if(this.current.type==r.Equal){var l=this.matchToken(r.Equal),p=this.parseExpression();a=new B(l,p)}return t&&null==a&&this.diagnostics.push(new i(n.textSpan,'"'+n.text+'" must have an initializer')),null==a&&null==o&&this.diagnostics.push(new i(n.textSpan,'"'+n.text+'" must have a type or an initializer')),new k(e,n,o,a)},e.prototype.parseIfStatement=function(){var e=this.matchToken(r.IfKeyword),t=this.parseExpression(),n=this.parseStatement(),i=this.current.type==r.ElseKeyword?this.parseElseClause():void 0;return new O(e,t,n,i)},e.prototype.parseElseClause=function(){var e=this.matchToken(r.ElseKeyword),t=this.parseStatement();return new q(e,t)},e.prototype.parseWhileStatement=function(){var e=this.matchToken(r.WhileKeyword),t=this.parseExpression(),n=this.parseStatement();return new N(e,t,n)},e.prototype.parseExpressionStatement=function(){var e=this.parseExpression();return new T(e)},e.prototype.parseExpression=function(){return this.parseAssignmentExpression()},e.prototype.parseAssignmentExpression=function(){if(this.peek(0).type==r.Identifier&&this.peek(1).type==r.Equal){var e=this.matchToken(r.Identifier),t=this.matchToken(r.Equal),n=this.parseAssignmentExpression();return new x(e,t,n)}return this.parseBinaryExpression()},e.prototype.parseBinaryExpression=function(e){var t;void 0===e&&(e=0);var n=se.getUnaryOperatorPrecedence(this.current.type);if(null!=n&&n>=e){var r=this.matchToken.apply(this,se.getUnaryOpertors()),i=this.parseBinaryExpression(n);t=new v(r,i)}else t=this.parsePrimaryExpression();for(;;){var o=se.getBinaryOperatorPrecedence(this.current.type);if(null==o||o<=e)break;var a=this.matchToken.apply(this,se.getBinaryOpertors()),s=this.parseBinaryExpression(o);t=new g(t,a,s)}return t},e.prototype.parsePrimaryExpression=function(){switch(this.current.type){case r.OpenParenthesis:var e=this.matchToken(r.OpenParenthesis),t=this.parseExpression(),n=this.matchToken(r.CloseParenthesis);return new w(e,t,n);case r.True:case r.False:var o=this.matchToken(r.True,r.False);return new m(o.type==r.True,o);case r.Identifier:return o=this.matchToken(r.Identifier),new S(o);case r.Number:var a=this.matchToken(r.Number),s=Number(a.text);return new b(s,a);case r.String:var u=this.matchToken(r.String),l=u.text.substring(1,u.text.length-1);return new y(l,u);default:return this.diagnostics.push(new i(this.current.textSpan,"Unexpected token <"+se.getTypeName(this.current.type)+">.")),new h}},e}(),pe=function(){function e(e,t){this.name="SyntaxTree",this.root=e,this.diagnostics=t}return Object.defineProperty(e.prototype,"textSpan",{get:function(){return this.root.statement.textSpan},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"children",{get:function(){return[this.root.statement]},enumerable:!1,configurable:!0}),e.parse=function(t){var n=new le(t);return new e(n.parseCompilationUnit(),n.diagnostics)},e}();var ce=n(631),he=(n(380),n(45),n(805),n(379)),fe=n.n(he),de=n(491);fe()(de.Z,{insert:"head",singleton:!1}),de.Z.locals,n(568);var ye=n(572),be=n(755),me=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a];return r};(0,ye.Z)(["#top-panel","#bottom-panel"],{direction:"vertical",sizes:[75,25]}),(0,ye.Z)(["#vseditor","#ast_cont"],{direction:"horizontal",sizes:[75,25]});var ge=document.getElementById("run-btn"),ve=document.getElementById("output"),we=[];ce.defineMode("tah",(function(){return{name:"tah",startState:function(){return{isInComment:!1}},token:function(e,t){if(e.match(/^\/\*/))return t.isInComment=!0,"comment";if(e.match(/^\*\//))return t.isInComment=!1,"comment";if(t.isInComment)return e.next(),"comment";for(var n=0;n<oe.length;n++){var i=oe[n],o=i.tokenType,a=i.pattern,s=r[o];if(e.match(a))return se.getTypesKeywords().includes(o)?"type":se.getAllOpertors().includes(o)?"operator":s.toLocaleLowerCase().includes("keyword")?"keyword":o==r.Comment?"comment":o==r.Identifier?"variable":o==r.String?"string":o==r.Number?"number":s}return e.next(),"error red_wavy_line"}}}));var xe=ce(document.getElementById("vseditor"),{value:'/**\n* You can edit and run this code. \n* Tah Lang by TarekkMA\n*/\n\n//This is a simple example illustrating how you can use tah-lang\n{\n  val a as string = "this is a const string"\n  var x as number = 1\n\n  \n  while x < 50\n    x = x + 8\n  \n  x /*Result should be 57.7*/\n  "hello" + " " + "Tarek"\n}\n',lineNumbers:!0,theme:"darcula",mode:"tah",tabSize:2,viewportMargin:1/0});function Se(e,t){for(var n=0,r=0,i=0;i<e;i++)"\n"==t[i]?(n++,r=0):r++;return{line:n,ch:r}}function Ee(e){return{text:e.name,icon:!1,children:me([(t=e.textSpan,{text:"__loc__",icon:!1,children:t?[{text:"start: "+t.start,icon:!1},{text:"start: "+t.end,icon:!1},{text:"length: "+t.length,icon:!1}]:[{text:"undfined",icon:!1}]})],Te(e.children)||[])};var t}function Te(e){if(null!=e)return e.map(Ee)}xe.on("change",(function(){0!=we.length&&(we.forEach((function(e){return e.clear()})),we.length=0)})),ge.onclick=function(){var e=xe.getValue(),t=new Map,n=pe.parse(e);!function(e){be("#ast").jstree({core:{data:[Ee(e)]}})}(n);var r=new re(n).evaluate(t);r.diagnostics.length>0?(ve.innerHTML=r.diagnostics.join("<br>"),r.diagnostics.forEach((function(t){var n,r,i=(n=t.span,r=e,console.log(r.substr(n.start,n.length)),{from:Se(n.start,r),to:Se(n.end,r)}),o=i.from,a=i.to;console.log(o,a);var s=xe.markText(o,a,{className:"cm-red_wavy_line"});we.push(s)}))):ve.innerHTML=r.value}}},t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={id:r,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.p="/tah-lang/",(()=>{var e={179:0},t=[[705,216]],r=()=>{};function i(){for(var r,i=0;i<t.length;i++){for(var o=t[i],a=!0,s=1;s<o.length;s++){var u=o[s];0!==e[u]&&(a=!1)}a&&(t.splice(i--,1),r=n(n.s=o[0]))}return 0===t.length&&(n.x(),n.x=()=>{}),r}n.x=()=>{n.x=()=>{},a=a.slice();for(var e=0;e<a.length;e++)o(a[e]);return(r=i)()};var o=i=>{for(var o,a,[u,l,p,c]=i,h=0,f=[];h<u.length;h++)a=u[h],n.o(e,a)&&e[a]&&f.push(e[a][0]),e[a]=0;for(o in l)n.o(l,o)&&(n.m[o]=l[o]);for(p&&p(n),s(i);f.length;)f.shift()();return c&&t.push.apply(t,c),r()},a=self.webpackChunkcompiler=self.webpackChunkcompiler||[],s=a.push.bind(a);a.push=o})(),n.x()})();