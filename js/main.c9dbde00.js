(()=>{"use strict";var e={491:(e,t,n)=>{n.d(t,{Z:()=>h});var r=n(645),i=n.n(r),o=n(667),a=n.n(o),s=n(825),u=n(765),l=i()((function(e){return e[1]})),p=a()(s.Z),c=a()(u.Z);l.push([e.id,"body {\n  margin: 0;\n}\n\n.cm-red_wavy_line {\n  background: url(https://try.kotlinlang.org/static/images/wavyline-red.gif)\n    repeat-x 100% 100%;\n  padding-bottom: 2px;\n}\n\n.gutter {\n  background-color: #434649;\n\n  background-repeat: no-repeat;\n  background-position: 50%;\n}\n\n.gutter.gutter-horizontal {\n  background-image: url("+p+");\n  cursor: col-resize;\n}\n\n.gutter.gutter-vertical {\n  background-image: url("+c+");\n  cursor: row-resize;\n}\n.CodeMirror {\n  height: 100%;\n}\n\nhtml,\nbody {\n  height: 100%;\n}\n\n.CodeMirror .ast_highlighted {\n  background-color: rgba(255, 251, 0, 0.164);\n}\n",""]);const h=l},765:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"98604ef1a5065a065f3530d37af8364b.png"},825:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"5e6d1df402c3bc10ecc62407004bb95e.png"},705:(e,t,n)=>{var r,i=function(){function e(e,t){this.message=t,this.span=e}return e.prototype.toString=function(){return this.message},e}(),o=function(){function e(e,t){this.start=e,this.length=t}return Object.defineProperty(e.prototype,"end",{get:function(){return this.start+this.length},enumerable:!1,configurable:!0}),e.fromStartLength=function(t,n){return new e(t,n)},e.fromStartEnd=function(t,n){return new e(t,n-t)},e}();!function(e){e[e.WhiteSpace=0]="WhiteSpace",e[e.Comment=1]="Comment",e[e.Number=2]="Number",e[e.String=3]="String",e[e.Plus=4]="Plus",e[e.Minus=5]="Minus",e[e.Star=6]="Star",e[e.Slash=7]="Slash",e[e.Bang=8]="Bang",e[e.BangEqal=9]="BangEqal",e[e.False=10]="False",e[e.True=11]="True",e[e.Equal=12]="Equal",e[e.EqualEqual=13]="EqualEqual",e[e.AndAnd=14]="AndAnd",e[e.PipePipe=15]="PipePipe",e[e.OpenParenthesis=16]="OpenParenthesis",e[e.CloseParenthesis=17]="CloseParenthesis",e[e.OpenBrace=18]="OpenBrace",e[e.CloseBrace=19]="CloseBrace",e[e.StringKeyword=20]="StringKeyword",e[e.NumberKeyword=21]="NumberKeyword",e[e.BooleanKeyword=22]="BooleanKeyword",e[e.Identifier=23]="Identifier",e[e.EndOfFile=24]="EndOfFile",e[e.BadChar=25]="BadChar",e[e.AsKeyword=26]="AsKeyword",e[e.VarKeyword=27]="VarKeyword",e[e.ValKeyword=28]="ValKeyword",e[e.Less=29]="Less",e[e.GreaterEqal=30]="GreaterEqal",e[e.LessEqal=31]="LessEqal",e[e.Greater=32]="Greater",e[e.IfKeyword=33]="IfKeyword",e[e.WhileKeyword=34]="WhileKeyword",e[e.ElseKeyword=35]="ElseKeyword"}(r||(r={}));var a,s,u=function(){function e(e,t,n){this.type=t,this.name=r[this.type],this.position=e,this.text=n}return Object.defineProperty(e.prototype,"children",{get:function(){if(this.text)return[{name:this.text}]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"textSpan",{get:function(){var e;return o.fromStartLength(this.position,(null===(e=this.text)||void 0===e?void 0:e.length)||0)},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return"["+r[this.type]+"]@"+this.position+" text:'"+this.text},e}(),l=(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),p=function(){},c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t}(p),h=(function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.textSpan=o.fromStartLength(0,0),t.name="ExpressionStub",t}l(t,e),Object.defineProperty(t.prototype,"children",{get:function(){},enumerable:!1,configurable:!0})}(c),function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t}(p)),f=function(e){function t(t,n){var r=e.call(this)||this;return r.value=t,r.literalToken=n,r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return this.literalToken.textSpan},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.literalToken]},enumerable:!1,configurable:!0}),t}(c),d=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.name="StringLiteralExpression",r}return l(t,e),t}(f),y=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.name="NumberLiteralExpression",r}return l(t,e),t}(f),m=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.name="BooleanLiteralExpression",r}return l(t,e),t}(f),b=function(e){function t(t,n,r){var i=e.call(this)||this;return i.left=t,i.oprator=n,i.right=r,i.name="BinaryExpression",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.left.textSpan.start,this.right.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.left,this.oprator,this.right]},enumerable:!1,configurable:!0}),t}(c),g=function(e){function t(t,n){var r=e.call(this)||this;return r.operator=t,r.operand=n,r.name="UnaryExpression",r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.operator.textSpan.start,this.operand.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.operator,this.operand]},enumerable:!1,configurable:!0}),t}(c),v=function(e){function t(t,n,r){var i=e.call(this)||this;return i.openParenthesisToken=t,i.expression=n,i.closeParenthesisToken=r,i.name="ParenthesizedExpression",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.openParenthesisToken.textSpan.start,this.openParenthesisToken.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.openParenthesisToken,this.expression,this.closeParenthesisToken]},enumerable:!1,configurable:!0}),t}(c),x=function(e){function t(t,n,r){var i=e.call(this)||this;return i.identifier=t,i.equalsToken=n,i.expression=r,i.name="AssignmentExpression",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.identifier.textSpan.start,this.expression.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.identifier,this.equalsToken,this.expression]},enumerable:!1,configurable:!0}),t}(c),w=function(e){function t(t){var n=e.call(this)||this;return n.identifier=t,n.name="NameExpression",n}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return this.identifier.textSpan},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.identifier]},enumerable:!1,configurable:!0}),t}(c),S=function(e){function t(t,n,r){var i=e.call(this)||this;return i.openBraceToken=t,i.statements=n,i.closeBraceToken=r,i.name="BlockStatement",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.openBraceToken.textSpan.start,this.closeBraceToken.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a];return r}([this.openBraceToken],this.statements,[this.closeBraceToken])},enumerable:!1,configurable:!0}),t}(h),E=function(e){function t(t){var n=e.call(this)||this;return n.expression=t,n.name="ExpressionStatement",n}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return this.expression.textSpan},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.expression]},enumerable:!1,configurable:!0}),t}(h),T=function(e){function t(t,n,r,i){var o=e.call(this)||this;return o.keywordToken=t,o.identifier=n,o.asTypePart=r,o.initializerPart=i,o.name="VariableDeclarationStatement",o}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){var e,t,n=this.keywordToken.textSpan.start,r=(null===(e=this.initializerPart)||void 0===e?void 0:e.textSpan.end)||(null===(t=this.asTypePart)||void 0===t?void 0:t.textSpan.end)||this.identifier.textSpan.end;return o.fromStartEnd(n,r)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){var e,t;return[this.keywordToken,this.identifier].concat((null===(e=this.asTypePart)||void 0===e?void 0:e.children)||[],(null===(t=this.initializerPart)||void 0===t?void 0:t.initializer)||[])},enumerable:!1,configurable:!0}),t}(h),k=function(e){function t(t,n){var r=e.call(this)||this;return r.equalsToken=t,r.initializer=n,r.name="VariableDeclarationInitalizerPart",r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.equalsToken.textSpan.start,this.initializer.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.equalsToken,this.initializer]},enumerable:!1,configurable:!0}),t}(p),B=function(e){function t(t,n){var r=e.call(this)||this;return r.asKeywordToken=t,r.typeToken=n,r.name="VariableDeclarationAsTypePart",r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.asKeywordToken.textSpan.start,this.typeToken.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.asKeywordToken,this.typeToken]},enumerable:!1,configurable:!0}),t}(p),P=function(e){function t(t,n,r,i){var o=e.call(this)||this;return o.ifKeyword=t,o.condition=n,o.thenStatement=r,o.elseClause=i,o.name="IfStatement",o}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){var e;return o.fromStartEnd(this.ifKeyword.textSpan.start,(null===(e=this.elseClause)||void 0===e?void 0:e.textSpan.end)||this.thenStatement.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.ifKeyword,this.condition,this.thenStatement].concat(this.elseClause?this.elseClause:[])},enumerable:!1,configurable:!0}),t}(h),O=function(e){function t(t,n){var r=e.call(this)||this;return r.elseKeyword=t,r.elseStatement=n,r.name="ElseClause",r}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.elseKeyword.textSpan.start,this.elseStatement.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.elseKeyword,this.elseStatement]},enumerable:!1,configurable:!0}),t}(p),q=function(e){function t(t,n,r){var i=e.call(this)||this;return i.whileKeyword=t,i.condition=n,i.body=r,i.name="WhileStatement",i}return l(t,e),Object.defineProperty(t.prototype,"textSpan",{get:function(){return o.fromStartEnd(this.whileKeyword.textSpan.start,this.body.textSpan.end)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"children",{get:function(){return[this.whileKeyword,this.condition,this.body]},enumerable:!1,configurable:!0}),t}(h);!function(e){e[e.Number=0]="Number",e[e.String=1]="String",e[e.Boolean=2]="Boolean"}(s||(s={}));var N,K=function(e,t,n){this.isReadOnly=e,this.name=t,this.type=n},j=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),L=function(){},A=function(){},C=function(e){function t(t){var n=e.call(this)||this;return n.value=t,n}return j(t,e),t}(L),_=function(e){function t(t){var n=e.call(this,t)||this;return n.type=s.String,n}return j(t,e),t}(C),I=function(e){function t(t){var n=e.call(this,t)||this;return n.type=s.Number,n}return j(t,e),t}(C),V=function(e){function t(t){var n=e.call(this,t)||this;return n.type=s.Boolean,n}return j(t,e),t}(C),z=function(e){function t(t,n,r){var i=e.call(this)||this;return i.left=t,i.operator=n,i.right=r,i}return j(t,e),Object.defineProperty(t.prototype,"type",{get:function(){return this.operator.resultType},enumerable:!1,configurable:!0}),t}(L),M=function(e){function t(t,n){var r=e.call(this)||this;return r.oprator=t,r.operand=n,r}return j(t,e),Object.defineProperty(t.prototype,"type",{get:function(){return this.oprator.resultType},enumerable:!1,configurable:!0}),t}(L),G=function(e){function t(t,n){var r=e.call(this)||this;return r.variable=t,r.expression=n,r}return j(t,e),Object.defineProperty(t.prototype,"type",{get:function(){return this.expression.type},enumerable:!1,configurable:!0}),t}(L),U=function(e){function t(t){var n=e.call(this)||this;return n.variable=t,n}return j(t,e),Object.defineProperty(t.prototype,"type",{get:function(){return this.variable.type},enumerable:!1,configurable:!0}),t}(L),W=function(e){function t(t){var n=e.call(this)||this;return n.statements=t,n}return j(t,e),t}(A),D=function(e){function t(t){var n=e.call(this)||this;return n.expression=t,n}return j(t,e),t}(A),F=function(e){function t(t,n){var r=e.call(this)||this;return r.variable=t,r.initializer=n,r}return j(t,e),t}(A),Z=function(e){function t(t,n,r){var i=e.call(this)||this;return i.condition=t,i.thenStatement=n,i.elseStatement=r,i}return j(t,e),t}(A),R=function(e){function t(t,n){var r=e.call(this)||this;return r.condition=t,r.body=n,r}return j(t,e),t}(A);!function(e){e[e.Addition=0]="Addition",e[e.Subtraction=1]="Subtraction",e[e.Multiplication=2]="Multiplication",e[e.Division=3]="Division",e[e.LogicalAnd=4]="LogicalAnd",e[e.LogicalOr=5]="LogicalOr",e[e.Equals=6]="Equals",e[e.NotEquals=7]="NotEquals",e[e.LessThan=8]="LessThan",e[e.LessThanOrEqualsTo=9]="LessThanOrEqualsTo",e[e.GreaterThan=10]="GreaterThan",e[e.GreaterThanOrEqualsTo=11]="GreaterThanOrEqualsTo",e[e.Concatination=12]="Concatination"}(N||(N={}));var H,Y=function(){function e(e,t,n,r,i){this.operatorTokenType=e,this.kind=t,this.leftType=n,this.rightType=r,this.resultType=i}return e.tryBind=function(e,t,n){for(var r=0;r<this.operators.length;r++){var i=this.operators[r];if(i.operatorTokenType==e&&i.leftType==t&&i.rightType==n)return i}return null},e.operators=[new e(r.Plus,N.Addition,s.Number,s.Number,s.Number),new e(r.Minus,N.Subtraction,s.Number,s.Number,s.Number),new e(r.Star,N.Multiplication,s.Number,s.Number,s.Number),new e(r.Slash,N.Division,s.Number,s.Number,s.Number),new e(r.EqualEqual,N.Equals,s.Number,s.Number,s.Boolean),new e(r.BangEqal,N.NotEquals,s.Number,s.Number,s.Boolean),new e(r.Less,N.LessThan,s.Number,s.Number,s.Boolean),new e(r.LessEqal,N.LessThanOrEqualsTo,s.Number,s.Number,s.Boolean),new e(r.Greater,N.GreaterThan,s.Number,s.Number,s.Boolean),new e(r.GreaterEqal,N.GreaterThanOrEqualsTo,s.Number,s.Number,s.Boolean),new e(r.AndAnd,N.LogicalAnd,s.Boolean,s.Boolean,s.Boolean),new e(r.PipePipe,N.LogicalOr,s.Boolean,s.Boolean,s.Boolean),new e(r.EqualEqual,N.Equals,s.Boolean,s.Boolean,s.Boolean),new e(r.BangEqal,N.NotEquals,s.Boolean,s.Boolean,s.Boolean),new e(r.Plus,N.Concatination,s.String,s.String,s.String),new e(r.EqualEqual,N.Equals,s.String,s.String,s.Boolean)],e}();!function(e){e[e.Identity=0]="Identity",e[e.Negation=1]="Negation",e[e.LogicalNegation=2]="LogicalNegation"}(H||(H={}));var J=function(){function e(e,t,n,r){this.operatorTokenType=e,this.kind=t,this.operandType=n,this.resultType=r}return e.tryBind=function(e,t){for(var n=0;n<this.operators.length;n++){var r=this.operators[n];if(r.operatorTokenType==e&&r.operandType==t)return r}return null},e.operators=[new e(r.Plus,H.Identity,s.Number,s.Number),new e(r.Minus,H.Negation,s.Number,s.Number),new e(r.Bang,H.LogicalNegation,s.Boolean,s.Boolean)],e}(),Q=function(e,t,n,r){this.diagnostics=e,this.variables=t,this.statement=n,this.previous=r},X=function(){function e(e){this.variables=new Map,this.parent=e}return e.prototype.tryDeclare=function(e){return!this.variables.has(e.name)&&(this.variables.set(e.name,e),!0)},e.prototype.tryLookup=function(e){return this.variables.has(e)?this.variables.get(e):null==this.parent?null:this.parent.tryLookup(e)},e.prototype.getDeclaredVariables=function(){return Array.from(this.variables.values())},e}(),$=function(){function e(e){this.diagnostics=[],this.scope=new X(e)}return e.bindGlobalScope=function(t,n){var r,i=new e(this.createParentScope(n)),o=i.bindStatement(t.statement),a=(null===(r=i.scope)||void 0===r?void 0:r.getDeclaredVariables())||[],s=((null==n?void 0:n.diagnostics)||[]).concat(i.diagnostics);return new Q(s,a,o,n)},e.createParentScope=function(e){for(var t=[];null!=e;)t.push(e),e=e.previous;for(var n=void 0;t.length>0;){e=t.pop();for(var r=new X(n),i=0,o=(null==e?void 0:e.variables)||[];i<o.length;i++){var a=o[i];r.tryDeclare(a)}n=r}return n},e.prototype.bindStatement=function(e){if(e instanceof S)return this.bindBlockStatement(e);if(e instanceof T)return this.bindVariableDeclarationStatement(e);if(e instanceof E)return this.bindExpressionStatement(e);if(e instanceof P)return this.bindIfStatement(e);if(e instanceof q)return this.bindWhileStatement(e);throw new Error('Unexprected statement type "'+e.constructor.name+'"')},e.prototype.bindBlockStatement=function(e){var t=[];this.scope=new X(this.scope);for(var n=0,r=e.statements;n<r.length;n++){var i=r[n],o=this.bindStatement(i);t.push(o)}return this.scope=this.scope.parent,new W(t)},e.prototype.bindVariableDeclarationStatement=function(e){var t,n,o=e.identifier.text,a=e.keywordToken.type==r.ValKeyword,u=e.initializerPart?this.bindExpression(e.initializerPart.initializer):void 0;if(null!=e.asTypePart){var l=function(e){switch(e){case r.NumberKeyword:return s.Number;case r.StringKeyword:return s.String;case r.BooleanKeyword:return s.Boolean}throw new Error("Unkown token type "+r[e])}(e.asTypePart.typeToken.type);null!=u&&u.type!=l&&this.diagnostics.push(new i(e.initializerPart.equalsToken.textSpan,s[u.type]+" cannot be assigned to a variable of type "+s[l])),n=l}else null!=u&&(n=u.type);var p=new K(a,o,n);return(null===(t=this.scope)||void 0===t?void 0:t.tryDeclare(p))||this.diagnostics.push(new i(e.identifier.textSpan,"Variable with the name "+o+" already declared")),new F(p,u)},e.prototype.bindExpressionStatement=function(e){var t=this.bindExpression(e.expression);return new D(t)},e.prototype.bindIfStatement=function(e){var t=this.bindExpressionWithExpectedType(e.condition,s.Boolean),n=this.bindStatement(e.thenStatement),r=e.elseClause?this.bindStatement(e.elseClause.elseStatement):void 0;return new Z(t,n,r)},e.prototype.bindWhileStatement=function(e){var t=this.bindExpressionWithExpectedType(e.condition,s.Boolean),n=this.bindStatement(e.body);return new R(t,n)},e.prototype.bindExpressionWithExpectedType=function(e,t){var n=this.bindExpression(e);return n.type!=t&&this.diagnostics.push(new i(e.textSpan,"expected the expression to evaluate to "+s[t]+" but it did evaluate to "+s[n.type]+".")),n},e.prototype.bindExpression=function(e){if(e instanceof v)return this.bindParenthesizedExpression(e);if(e instanceof f)return this.bindLiteralExpression(e);if(e instanceof w)return this.bindNameExpression(e);if(e instanceof x)return this.bindAssignmentExpression(e);if(e instanceof g)return this.bindUnaryExpression(e);if(e instanceof b)return this.bindBinaryExpression(e);throw new Error("Unexpected expression type "+e.constructor.name)},e.prototype.bindParenthesizedExpression=function(e){return this.bindExpression(e.expression)},e.prototype.bindLiteralExpression=function(e){if(e instanceof d)return new _(e.value);if(e instanceof y)return new I(e.value);if(e instanceof m)return new V(e.value);throw new Error("Unexpected literal expression type "+e.constructor.name)},e.prototype.bindNameExpression=function(e){var t,n,r,o=e.identifier.text;return null==(r=null!==(n=null===(t=this.scope)||void 0===t?void 0:t.tryLookup(o))&&void 0!==n?n:null)?(this.diagnostics.push(new i(e.identifier.textSpan,"Cannot find a variable with the name "+o+".")),new I(0)):new U(r)},e.prototype.bindAssignmentExpression=function(e){var t,n,r,o=e.identifier.text,a=this.bindExpression(e.expression);return null==(r=null!==(n=null===(t=this.scope)||void 0===t?void 0:t.tryLookup(o))&&void 0!==n?n:null)?(this.diagnostics.push(new i(e.identifier.textSpan,"Cannot find a variable with the name "+o+".")),a):(r.isReadOnly&&this.diagnostics.push(new i(e.identifier.textSpan,o+" is a read only variable.")),a.type!=r.type?(this.diagnostics.push(new i(e.identifier.textSpan,s[a.type]+" cannot be assigned to a variable of type "+s[r.type])),a):new G(r,a))},e.prototype.bindUnaryExpression=function(e){var t=this.bindExpression(e.operand),n=J.tryBind(e.operator.type,t.type);return null==n?(this.diagnostics.push(new i(e.operator.textSpan,"Unary operator '"+e.operator.text+"' is not defined for type "+s[t.type]+".")),t):new M(n,t)},e.prototype.bindBinaryExpression=function(e){var t=this.bindExpression(e.left),n=this.bindExpression(e.right),r=Y.tryBind(e.oprator.type,t.type,n.type);return null==r?(this.diagnostics.push(new i(e.oprator.textSpan,"Binary operator '"+e.oprator.text+"' is not defined for types "+s[t.type]+" and "+s[n.type]+".")),t):new z(t,r,n)},e}(),ee=function(){function e(e,t){this.root=e,this.variables=t}return e.prototype.evaluate=function(){return this.evaluateStatement(this.root),this.lastValue},e.prototype.evaluateStatement=function(e){if(e instanceof W)this.evaluateBoundBlockStatement(e);else if(e instanceof F)this.evaluateBoundVariableDeclarationStatement(e);else if(e instanceof D)this.evaluateExpressionStatement(e);else if(e instanceof Z)this.evaluateBoundIfStatement(e);else{if(!(e instanceof R))throw new Error("Unexpexted statemnt "+e.constructor.name);this.evaluateBoundWhileStatement(e)}},e.prototype.evaluateBoundWhileStatement=function(e){for(;this.evaluateExpression(e.condition);)this.evaluateStatement(e.body)},e.prototype.evaluateBoundIfStatement=function(e){this.evaluateExpression(e.condition)?this.evaluateStatement(e.thenStatement):null!=e.elseStatement&&this.evaluateStatement(e.elseStatement)},e.prototype.evaluateBoundBlockStatement=function(e){for(var t=0,n=e.statements;t<n.length;t++){var r=n[t];this.evaluateStatement(r)}},e.prototype.evaluateBoundVariableDeclarationStatement=function(e){var t=e.initializer?this.evaluateExpression(e.initializer):void 0;this.variables.set(e.variable,t),this.lastValue=t},e.prototype.evaluateExpressionStatement=function(e){this.lastValue=this.evaluateExpression(e.expression)},e.prototype.evaluateExpression=function(e){if(e instanceof C)return this.evaluateBoundLiteralExpression(e);if(e instanceof U)return this.evaluateBoundVariableExpression(e);if(e instanceof G)return this.evaluateBoundAssignmentExpression(e);if(e instanceof M)return this.evaluateBoundUnaryExpression(e);if(e instanceof z)return this.evaluateBoundBinaryExpression(e);throw new Error("Unexpexted expression "+e.constructor.name)},e.prototype.evaluateBoundLiteralExpression=function(e){return e.value},e.prototype.evaluateBoundVariableExpression=function(e){return this.variables.get(e.variable)},e.prototype.evaluateBoundAssignmentExpression=function(e){var t=this.evaluateExpression(e.expression);return this.variables.set(e.variable,t),t},e.prototype.evaluateBoundUnaryExpression=function(e){var t=this.evaluateExpression(e.operand);switch(e.oprator.kind){case H.Identity:return t;case H.Negation:return-t;case H.LogicalNegation:return!t;default:throw new Error("Unexpected unary operator "+H[e.oprator.kind])}},e.prototype.evaluateBoundBinaryExpression=function(e){var t=this.evaluateExpression(e.left),n=this.evaluateExpression(e.right);switch(e.operator.kind){case N.Addition:return t+n;case N.Subtraction:return t-n;case N.Multiplication:return t*n;case N.Division:return t/n;case N.LogicalAnd:return t&&n;case N.LogicalOr:return t||n;case N.Equals:return t==n;case N.Addition:return t!=n;case N.LessThan:return t<n;case N.GreaterThan:return t>n;case N.LessThanOrEqualsTo:return t<=n;case N.GreaterThanOrEqualsTo:return t>=n;case N.Concatination:return t+n;default:throw new Error("Unexpected unary operator "+N[e.operator.kind])}},e}(),te=function(e,t){this.diagnostics=e,this.value=t},ne=function(){function e(e,t){this.syntaxTree=e,this.previous=t}return Object.defineProperty(e.prototype,"globalScope",{get:function(){var e;return null==this._globalScope&&(this._globalScope=$.bindGlobalScope(this.syntaxTree.root,null===(e=this.previous)||void 0===e?void 0:e.globalScope)),this._globalScope},enumerable:!1,configurable:!0}),e.prototype.continueWith=function(t){return new e(t,this)},e.prototype.evaluate=function(e){var t=this.syntaxTree.diagnostics.concat(this.globalScope.diagnostics);if(t.length)return new te(t,null);var n=new ee(this.globalScope.statement,e).evaluate();return new te([],n)},e}(),re=function(e,t){this.pattern=e,this.tokenType=t},ie=[new re(/^\s+/,r.WhiteSpace),new re(/^\/\/.*/,r.Comment),new re(/^\/\*((.|\s)*?)\*\//,r.Comment),new re(/^[0-9]+(\.[0-9]+){0,1}/,r.Number),new re(/^var/,r.VarKeyword),new re(/^val/,r.ValKeyword),new re(/^as/,r.AsKeyword),new re(/^if/,r.IfKeyword),new re(/^else/,r.ElseKeyword),new re(/^while/,r.WhileKeyword),new re(/^string/,r.StringKeyword),new re(/^number/,r.NumberKeyword),new re(/^boolean/,r.BooleanKeyword),new re(/^true/,r.True),new re(/^false/,r.False),new re(/^\<\=/,r.LessEqal),new re(/^\>\=/,r.GreaterEqal),new re(/^\</,r.Less),new re(/^\>/,r.Greater),new re(/^\!\=/,r.BangEqal),new re(/^\!/,r.Bang),new re(/^\=\=/,r.EqualEqual),new re(/^\&\&/,r.AndAnd),new re(/^\|\|/,r.PipePipe),new re(/^\=/,r.Equal),new re(/^\+/,r.Plus),new re(/^\+/,r.Plus),new re(/^\-/,r.Minus),new re(/^\//,r.Slash),new re(/^\*/,r.Star),new re(/^\(/,r.OpenParenthesis),new re(/^\)/,r.CloseParenthesis),new re(/^\{/,r.OpenBrace),new re(/^\}/,r.CloseBrace),new re(/^((\"[^\"]*\")|(\'[^\']*\'))/,r.String),new re(/^[a-zA-Z_][a-zA-Z_0-9]*/,r.Identifier)];const oe=function(){function e(e){this.position=0,this.diagnostics=[],this.codeString=e}return e.prototype.current=function(){return this.position>=this.codeString.length?"\0":this.codeString[this.position]},e.prototype.lex=function(){if("\0"==this.current())return new u(this.codeString.length,r.EndOfFile,"\0");for(var e=this.codeString.substring(this.position),t=0;t<ie.length;t++){var n=ie[t],o=n.pattern.exec(e);if(null!=o){var a=o[0],s=this.position;return this.position+=a.length,new u(s,n.tokenType,o[0])}}var l=this.current(),p=this.position,c=new u(p,r.BadChar,l);return this.diagnostics.push(new i(c.textSpan,"Bad character input: "+l)),this.position++,c},e}();var ae=function(){function e(){}return e.getUnaryOperatorPrecedence=function(e){switch(e){case r.Plus:case r.Minus:case r.Bang:return 6;default:return null}},e.getBinaryOperatorPrecedence=function(e){switch(e){case r.Star:case r.Slash:return 5;case r.Plus:case r.Minus:return 4;case r.BangEqal:case r.EqualEqual:case r.Less:case r.LessEqal:case r.Greater:case r.GreaterEqal:return 3;case r.AndAnd:return 2;case r.PipePipe:return 1;default:return null}},e.getTypeName=function(e){return r[e]},e.getTypesKeywords=function(){return[r.StringKeyword,r.NumberKeyword,r.BooleanKeyword]},e.getUnaryOpertors=function(){return[r.Plus,r.Minus,r.Bang]},e.getBinaryOpertors=function(){return[r.Star,r.Slash,r.Plus,r.Minus,r.BangEqal,r.EqualEqual,r.Less,r.LessEqal,r.Greater,r.GreaterEqal,r.AndAnd,r.PipePipe]},e.getAllOpertors=function(){return this.getBinaryOpertors().concat(this.getUnaryOpertors())},e}(),se=function(e){this.statement=e};const ue=function(){function e(e){var t;this.position=0,this.diagnostics=[];var n,i=[],o=new oe(e);do{n=o.lex(),0==[r.WhiteSpace,r.BadChar,r.Comment].includes(n.type)&&i.push(n)}while(n.type!=r.EndOfFile);this.tokens=i,(t=this.diagnostics).push.apply(t,o.diagnostics)}return e.prototype.peek=function(e){var t=this.position+e;return t>=this.tokens.length?this.tokens[this.tokens.length-1]:this.tokens[t]},Object.defineProperty(e.prototype,"current",{get:function(){return this.peek(0)},enumerable:!1,configurable:!0}),e.prototype.nextToken=function(){var e=this.current;return this.position++,e},e.prototype.matchToken=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e.includes(this.current.type)?this.nextToken():(this.diagnostics.push(new i(this.current.textSpan,"Unexpected token <"+ae.getTypeName(this.current.type)+">, expected "+e.map((function(e){return"<"+ae.getTypeName(e)+">"})).join(" or ")+".")),new u(this.current.position,e[0]))},e.prototype.parseCompilationUnit=function(){var e=this.parseStatement();return this.matchToken(r.EndOfFile),new se(e)},e.prototype.parseStatement=function(){switch(this.current.type){case r.OpenBrace:return this.parseBlockStatement();case r.ValKeyword:case r.VarKeyword:return this.parseVariableDeclarationStatement();case r.IfKeyword:return this.parseIfStatement();case r.WhileKeyword:return this.parseWhileStatement();default:return this.parseExpressionStatement()}},e.prototype.parseBlockStatement=function(){for(var e=Array(),t=this.matchToken(r.OpenBrace);0==[r.EndOfFile,r.CloseBrace].includes(this.current.type);){var n=this.current,i=this.parseStatement();this.current!=n?e.push(i):this.nextToken()}var o=this.matchToken(r.CloseBrace);return new S(t,e,o)},e.prototype.parseVariableDeclarationStatement=function(){var e=this.matchToken(r.VarKeyword,r.ValKeyword),t=e.type==r.ValKeyword,n=this.matchToken(r.Identifier),o=void 0,a=void 0;if(this.current.type==r.AsKeyword){var s=this.matchToken(r.AsKeyword),u=this.matchToken.apply(this,ae.getTypesKeywords());o=new B(s,u)}if(this.current.type==r.Equal){var l=this.matchToken(r.Equal),p=this.parseExpression();a=new k(l,p)}return t&&null==a&&this.diagnostics.push(new i(n.textSpan,'"'+n.text+'" must have an initializer')),null==a&&null==o&&this.diagnostics.push(new i(n.textSpan,'"'+n.text+'" must have a type or an initializer')),new T(e,n,o,a)},e.prototype.parseIfStatement=function(){var e=this.matchToken(r.IfKeyword),t=this.parseExpression(),n=this.parseStatement(),i=this.current.type==r.ElseKeyword?this.parseElseClause():void 0;return new P(e,t,n,i)},e.prototype.parseElseClause=function(){var e=this.matchToken(r.ElseKeyword),t=this.parseStatement();return new O(e,t)},e.prototype.parseWhileStatement=function(){var e=this.matchToken(r.WhileKeyword),t=this.parseExpression(),n=this.parseStatement();return new q(e,t,n)},e.prototype.parseExpressionStatement=function(){var e=this.parseExpression();return new E(e)},e.prototype.parseExpression=function(){return this.parseAssignmentExpression()},e.prototype.parseAssignmentExpression=function(){if(this.peek(0).type==r.Identifier&&this.peek(1).type==r.Equal){var e=this.matchToken(r.Identifier),t=this.matchToken(r.Equal),n=this.parseAssignmentExpression();return new x(e,t,n)}return this.parseBinaryExpression()},e.prototype.parseBinaryExpression=function(e){var t;void 0===e&&(e=0);var n=ae.getUnaryOperatorPrecedence(this.current.type);if(null!=n&&n>=e){var r=this.matchToken.apply(this,ae.getUnaryOpertors()),i=this.parseBinaryExpression(n);t=new g(r,i)}else t=this.parsePrimaryExpression();for(;;){var o=ae.getBinaryOperatorPrecedence(this.current.type);if(null==o||o<=e)break;var a=this.matchToken.apply(this,ae.getBinaryOpertors()),s=this.parseBinaryExpression(o);t=new b(t,a,s)}return t},e.prototype.parsePrimaryExpression=function(){switch(this.current.type){case r.OpenParenthesis:var e=this.matchToken(r.OpenParenthesis),t=this.parseExpression(),n=this.matchToken(r.CloseParenthesis);return new v(e,t,n);case r.True:case r.False:var i=this.matchToken(r.True,r.False);return new m(i.type==r.True,i);case r.Number:var o=this.matchToken(r.Number),a=Number(o.text);return new y(a,o);case r.String:var s=this.matchToken(r.String),u=s.text.substring(1,s.text.length-1);return new d(u,s);case r.Identifier:default:return i=this.matchToken(r.Identifier),new w(i)}},e}(),le=function(){function e(e,t){this.name="SyntaxTree",this.root=e,this.diagnostics=t}return Object.defineProperty(e.prototype,"textSpan",{get:function(){return this.root.statement.textSpan},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"children",{get:function(){return[this.root.statement]},enumerable:!1,configurable:!0}),e.parse=function(t){var n=new ue(t);return new e(n.parseCompilationUnit(),n.diagnostics)},e}();var pe=n(631),ce=(n(380),n(45),n(805),n(379)),he=n.n(ce),fe=n(491);he()(fe.Z,{insert:"head",singleton:!1}),fe.Z.locals,n(568);var de=n(572),ye=n(755),me=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a];return r};ye("#ast").on("hover_node.jstree",(function(e,t){ke(t)})).on("dehover_node.jstree",(function(e,t){ke(t,!0)})).jstree({core:{data:[]}}),(0,de.Z)(["#top-panel","#bottom-panel"],{direction:"vertical",sizes:[75,25]}),(0,de.Z)(["#vseditor","#ast_cont"],{direction:"horizontal",sizes:[75,25]});var be=document.getElementById("run-btn"),ge=document.getElementById("output"),ve=[],xe=new Map,we=new Map;pe.defineMode("tah",(function(){return{name:"tah",startState:function(){return{isInComment:!1}},token:function(e,t){if(e.match(/^\/\*/))return t.isInComment=!0,"comment";if(e.match(/^\*\//))return t.isInComment=!1,"comment";if(t.isInComment)return e.next(),"comment";for(var n=0;n<ie.length;n++){var i=ie[n],o=i.tokenType,a=i.pattern,s=r[o];if(e.match(a))return ae.getTypesKeywords().includes(o)?"type":ae.getAllOpertors().includes(o)?"operator":s.toLocaleLowerCase().includes("keyword")?"keyword":o==r.Comment?"comment":o==r.Identifier?"variable":o==r.String?"string":o==r.Number?"number":s}return e.next(),"error red_wavy_line"}}}));var Se=pe(document.getElementById("vseditor"),{value:'/**\n* You can edit and run this code. \n* Tah Lang by TarekkMA\n*/\n\n//This is a simple example illustrating how you can use tah-lang\n{\n  val a as string = "this is a const string"\n  var x as number = 1\n\n  \n  while x < 50\n    x = x + 8\n  \n  x /*Result should be 57.7*/\n  "hello" + " " + "Tarek"\n}\n',lineNumbers:!0,theme:"darcula",mode:"tah",tabSize:2,viewportMargin:1/0});function Ee(e,t){return{from:Te(e.start,t),to:Te(e.end,t)}}function Te(e,t){for(var n=0,r=0,i=0;i<e;i++)"\n"==t[i]?(n++,r=0):r++;return{line:n,ch:r}}function ke(e,t){var n;void 0===t&&(t=!1);var r=(e=e.node).id,i=we.get(r);if(i&&(null===(n=xe.get(r))||void 0===n||n.clear(),!t)){var o=Ee(i,Se.getValue()),a=o.from,s=o.to,u=Se.markText(a,s,{className:"ast_highlighted"});xe.set(r,u)}}function Be(e){var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}));return we.set(t,e.textSpan),{text:e.name,icon:!1,id:t,children:me(Pe(e.children)||[])}}function Pe(e){if(null!=e)return e.map(Be)}Se.on("change",(function(){0!=ve.length&&(ve.forEach((function(e){return e.clear()})),ve.length=0)})),be.onclick=function(){var e=Se.getValue(),t=new Map,n=le.parse(e);!function(e){we.clear(),xe.forEach((function(e){return e.clear()})),xe.clear(),ye("#ast").jstree(!0).settings.core.data=[Be(e)],ye("#ast").jstree(!0).refresh()}(n);var r=new ne(n).evaluate(t);r.diagnostics.length>0?(ge.innerHTML=r.diagnostics.join("<br>"),r.diagnostics.forEach((function(t){var n=Ee(t.span,e),r=n.from,i=n.to,o=Se.markText(r,i,{className:"cm-red_wavy_line"});ve.push(o)}))):ge.innerHTML=r.value}}},t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={id:r,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.p="/tah-lang/",(()=>{var e={179:0},t=[[705,216]],r=()=>{};function i(){for(var r,i=0;i<t.length;i++){for(var o=t[i],a=!0,s=1;s<o.length;s++){var u=o[s];0!==e[u]&&(a=!1)}a&&(t.splice(i--,1),r=n(n.s=o[0]))}return 0===t.length&&(n.x(),n.x=()=>{}),r}n.x=()=>{n.x=()=>{},a=a.slice();for(var e=0;e<a.length;e++)o(a[e]);return(r=i)()};var o=i=>{for(var o,a,[u,l,p,c]=i,h=0,f=[];h<u.length;h++)a=u[h],n.o(e,a)&&e[a]&&f.push(e[a][0]),e[a]=0;for(o in l)n.o(l,o)&&(n.m[o]=l[o]);for(p&&p(n),s(i);f.length;)f.shift()();return c&&t.push.apply(t,c),r()},a=self.webpackChunkcompiler=self.webpackChunkcompiler||[],s=a.push.bind(a);a.push=o})(),n.x()})();