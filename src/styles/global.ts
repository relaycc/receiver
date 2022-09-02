import { createGlobalStyle } from 'styled-components';

export const ROOT_CLASSNAME = 'relay-receiver';

export const GlobalStyles = createGlobalStyle`
.relay-receiver * {
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.relay-receiver a {
  text-decoration: none;
}
// CSS RESET START
 .relay-receiver html,
 .relay-receiver body,
 .relay-receiver div,
 .relay-receiver span,
 .relay-receiver applet,
 .relay-receiver object,
 .relay-receiver iframe,
 .relay-receiver h1,
 .relay-receiver h2,
 .relay-receiver h3,
 .relay-receiver h4,
 .relay-receiver h5,
 .relay-receiver h6,
 .relay-receiver p,
 .relay-receiver blockquote,
 .relay-receiver pre,
 .relay-receiver a,
 .relay-receiver abbr,
 .relay-receiver acronym,
 .relay-receiver address,
 .relay-receiver big,
 .relay-receiver cite,
 .relay-receiver code,
 .relay-receiver del,
 .relay-receiver dfn,
 .relay-receiver em,
 .relay-receiver img,
 .relay-receiver ins,
 .relay-receiver kbd,
 .relay-receiver q,
 .relay-receiver s,
 .relay-receiver samp,
 .relay-receiver small,
 .relay-receiver strike,
 .relay-receiver strong,
 .relay-receiver sub,
 .relay-receiver sup,
 .relay-receiver tt,
 .relay-receiver var,
 .relay-receiver b,
 .relay-receiver u,
 .relay-receiver i,
 .relay-receiver center,
 .relay-receiver dl,
 .relay-receiver dt,
 .relay-receiver dd,
 .relay-receiver ol,
 .relay-receiver ul,
 .relay-receiver li,
 .relay-receiver fieldset,
 .relay-receiver form,
 .relay-receiver label,
 .relay-receiver legend,
 .relay-receiver table,
 .relay-receiver caption,
 .relay-receiver tbody,
 .relay-receiver tfoot,
 .relay-receiver thead,
 .relay-receiver tr,
 .relay-receiver th,
 .relay-receiver td,
 .relay-receiver article,
 .relay-receiver aside,
 .relay-receiver canvas,
 .relay-receiver details,
 .relay-receiver embed,
 .relay-receiver figure,
 .relay-receiver figcaption,
 .relay-receiver footer,
 .relay-receiver header,
 .relay-receiver hgroup,
  .relay-receiver menu,
 .relay-receiver nav,
 .relay-receiver output,
 .relay-receiver ruby,
 .relay-receiver section,
 .relay-receiver summary,
 .relay-receiver input
.relay-receiver time,
 .relay-receiver mark,
 .relay-receiver audio,
 .relay-receiver video {
	border: 0;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
 .relay-receiver article,
 .relay-receiver aside,
 .relay-receiver details,
 .relay-receiver figcaption,
 .relay-receiver figure,
 .relay-receiver footer,
 .relay-receiver header,
 .relay-receiver hgroup,
 .relay-receiver menu,
 .relay-receiver nav,
 .relay-receiver section {
	display: block;
}
.relay-receiver body {
  background: white;
  line-height: 1;
  overflow-y: hidden;
  background-color: white;
}
.relay-receiver ol,
.relay-receiver ul {
  list-style: none;
}
.relay-receiver blockquote,
.relay-receiver q {
  quotes: none;
}
.relay-receiver blockquote:before,
.relay-receiver blockquote:after,
.relay-receiver q:before,
.relay-receiver q:after {
  content: '';
  content: none;
}
.relay-receiver table {
  border-collapse: collapse;
  border-spacing: 0;
}
.relay-receiver button,
.relay-receiver svg {
  cursor: pointer;
}
// CSS RESET END
`;
