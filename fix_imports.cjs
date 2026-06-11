const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf-8');
c = c.replace(/import \{ SiGithub, SiLinkedin \} from "react-icons\/si";/g, 'import { SiGithub } from "react-icons/si";\nimport { FaLinkedin } from "react-icons/fa";');
c = c.replace(/<SiLinkedin /g, '<FaLinkedin ');
fs.writeFileSync('src/pages/Home.tsx', c);
