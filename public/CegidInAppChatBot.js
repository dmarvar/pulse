// Get the title from script tag before anything else
const scriptTag = document.currentScript;
const defaultTitle = scriptTag?.dataset?.title || 'Assistant PulseOS';

// API Configuration
const API_BASE_URL = '/api/pulse';

// Inline SVG assets
const AVATAR_SVG = `<svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 8.82031C3.46875 8.82031 3.82031 9.21094 3.82031 9.67969C3.82031 10.1094 3.46875 10.5 3 10.5C2.53125 10.5 2.17969 10.1094 2.17969 9.67969C2.17969 9.21094 2.53125 8.82031 3 8.82031ZM3 12.1797C3.46875 12.1797 3.82031 12.5312 3.82031 13C3.82031 13.4688 3.46875 13.8203 3 13.8203C2.53125 13.8203 2.17969 13.4688 2.17969 13C2.17969 12.5312 2.53125 12.1797 3 12.1797ZM3 5.5C3.46875 5.5 3.82031 5.89062 3.82031 6.32031C3.82031 6.78906 3.46875 7.17969 3 7.17969C2.53125 7.17969 2.17969 6.78906 2.17969 6.32031C2.17969 5.89062 2.53125 5.5 3 5.5ZM0.5 5.92969C0.734375 5.92969 0.929688 6.08594 0.929688 6.32031C0.929688 6.55469 0.734375 6.75 0.5 6.75C0.265625 6.75 0.0703125 6.55469 0.0703125 6.32031C0.0703125 6.08594 0.265625 5.92969 0.5 5.92969ZM3 2.17969C3.46875 2.17969 3.82031 2.53125 3.82031 3C3.82031 3.46875 3.46875 3.82031 3 3.82031C2.53125 3.82031 2.17969 3.46875 2.17969 3C2.17969 2.53125 2.53125 2.17969 3 2.17969ZM15.5 6.75C15.2656 6.75 15.0703 6.55469 15.0703 6.32031C15.0703 6.08594 15.2656 5.92969 15.5 5.92969C15.7344 5.92969 15.9297 6.08594 15.9297 6.32031C15.9297 6.55469 15.7344 6.75 15.5 6.75ZM9.67969 3.82031C9.21094 3.82031 8.82031 3.46875 8.82031 3C8.82031 2.53125 9.21094 2.17969 9.67969 2.17969C10.1094 2.17969 10.5 2.53125 10.5 3C10.5 3.46875 10.1094 3.82031 9.67969 3.82031ZM9.67969 0.929688C9.44531 0.929688 9.25 0.734375 9.25 0.5C9.25 0.265625 9.44531 0.0703125 9.67969 0.0703125C9.91406 0.0703125 10.0703 0.265625 10.0703 0.5C10.0703 0.734375 9.91406 0.929688 9.67969 0.929688ZM0.5 9.25C0.734375 9.25 0.929688 9.44531 0.929688 9.67969C0.929688 9.91406 0.734375 10.0703 0.5 10.0703C0.265625 10.0703 0.0703125 9.91406 0.0703125 9.67969C0.0703125 9.44531 0.265625 9.25 0.5 9.25ZM6.32031 15.0703C6.55469 15.0703 6.75 15.2656 6.75 15.5C6.75 15.7344 6.55469 15.9297 6.32031 15.9297C6.08594 15.9297 5.92969 15.7344 5.92969 15.5C5.92969 15.2656 6.08594 15.0703 6.32031 15.0703ZM6.32031 0.929688C6.08594 0.929688 5.92969 0.734375 5.92969 0.5C5.92969 0.265625 6.08594 0.0703125 6.32031 0.0703125C6.55469 0.0703125 6.75 0.265625 6.75 0.5C6.75 0.734375 6.55469 0.929688 6.32031 0.929688ZM6.32031 3.82031C5.89062 3.82031 5.5 3.46875 5.5 3C5.5 2.53125 5.89062 2.17969 6.32031 2.17969C6.78906 2.17969 7.17969 2.53125 7.17969 3C7.17969 3.46875 6.78906 3.82031 6.32031 3.82031ZM6.32031 8.42969C7.02344 8.42969 7.57031 8.97656 7.57031 9.67969C7.57031 10.3438 7.02344 10.9297 6.32031 10.9297C5.65625 10.9297 5.07031 10.3438 5.07031 9.67969C5.07031 8.97656 5.65625 8.42969 6.32031 8.42969ZM13 8.82031C13.4688 8.82031 13.8203 9.21094 13.8203 9.67969C13.8203 10.1094 13.4688 10.5 13 10.5C12.5312 10.5 12.1797 10.1094 12.1797 9.67969C12.1797 9.21094 12.5312 8.82031 13 8.82031ZM13 12.1797C13.4688 12.1797 13.8203 12.5312 13.8203 13C13.8203 13.4688 13.4688 13.8203 13 13.8203C12.5312 13.8203 12.1797 13.4688 12.1797 13C12.1797 12.5312 12.5312 12.1797 13 12.1797ZM13 5.5C13.4688 5.5 13.8203 5.89062 13.8203 6.32031C13.8203 6.78906 13.4688 7.17969 13 7.17969C12.5312 7.17969 12.1797 6.78906 12.1797 6.32031C12.1797 5.89062 12.5312 5.5 13 5.5ZM13 2.17969C13.4688 2.17969 13.8203 2.53125 13.8203 3C13.8203 3.46875 13.4688 3.82031 13 3.82031C12.5312 3.82031 12.1797 3.46875 12.1797 3C12.1797 2.53125 12.5312 2.17969 13 2.17969ZM15.5 9.25C15.7344 9.25 15.9297 9.44531 15.9297 9.67969C15.9297 9.91406 15.7344 10.0703 15.5 10.0703C15.2656 10.0703 15.0703 9.91406 15.0703 9.67969C15.0703 9.44531 15.2656 9.25 15.5 9.25ZM9.67969 12.1797C10.1094 12.1797 10.5 12.5312 10.5 13C10.5 13.4688 10.1094 13.8203 9.67969 13.8203C9.21094 13.8203 8.82031 13.4688 8.82031 13C8.82031 12.5312 9.21094 12.1797 9.67969 12.1797ZM9.67969 15.0703C9.91406 15.0703 10.0703 15.2656 10.0703 15.5C10.0703 15.7344 9.91406 15.9297 9.67969 15.9297C9.44531 15.9297 9.25 15.7344 9.25 15.5C9.25 15.2656 9.44531 15.0703 9.67969 15.0703ZM6.32031 5.07031C7.02344 5.07031 7.57031 5.65625 7.57031 6.32031C7.57031 7.02344 7.02344 7.57031 6.32031 7.57031C5.65625 7.57031 5.07031 7.02344 5.07031 6.32031C5.07031 5.65625 5.65625 5.07031 6.32031 5.07031ZM6.32031 12.1797C6.78906 12.1797 7.17969 12.5312 7.17969 13C7.17969 13.4688 6.78906 13.8203 6.32031 13.8203C5.89062 13.8203 5.5 13.4688 5.5 13C5.5 12.5312 5.89062 12.1797 6.32031 12.1797ZM9.67969 8.42969C10.3438 8.42969 10.9297 8.97656 10.9297 9.67969C10.9297 10.3438 10.3438 10.9297 9.67969 10.9297C8.97656 10.9297 8.42969 10.3438 8.42969 9.67969C8.42969 8.97656 8.97656 8.42969 9.67969 8.42969ZM9.67969 5.07031C10.3438 5.07031 10.9297 5.65625 10.9297 6.32031C10.9297 7.02344 10.3438 7.57031 9.67969 7.57031C8.97656 7.57031 8.42969 7.02344 8.42969 6.32031C8.42969 5.65625 8.97656 5.07031 9.67969 5.07031Z" fill="#0046FE"/>
</svg>
`;

const BURGER_ICON_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 18L20 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <path d="M4 12L20 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <path d="M4 6L20 6" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const BRAND_LOGO_SVG = `
<svg width="193" height="43" viewBox="0 0 193 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5093 22.9697C13.3469 22.9697 13.9752 23.6695 13.9752 24.5095C13.9752 25.2793 13.3469 25.9792 12.5093 25.9792C11.6716 25.9792 11.0433 25.2793 11.0433 24.5095C11.0433 23.6695 11.6716 22.9697 12.5093 22.9697ZM12.5093 28.9886C13.3469 28.9886 13.9752 29.6184 13.9752 30.4583C13.9752 31.2983 13.3469 31.928 12.5093 31.928C11.6716 31.928 11.0433 31.2983 11.0433 30.4583C11.0433 29.6184 11.6716 28.9886 12.5093 28.9886ZM12.5093 17.0208C13.3469 17.0208 13.9752 17.7207 13.9752 18.4905C13.9752 19.3305 13.3469 20.0303 12.5093 20.0303C11.6716 20.0303 11.0433 19.3305 11.0433 18.4905C11.0433 17.7207 11.6716 17.0208 12.5093 17.0208ZM8.04167 17.7907C8.46051 17.7907 8.80954 18.0706 8.80954 18.4905C8.80954 18.9105 8.46051 19.2604 8.04167 19.2604C7.62282 19.2604 7.2738 18.9105 7.2738 18.4905C7.2738 18.0706 7.62282 17.7907 8.04167 17.7907ZM12.5093 11.0719C13.3469 11.0719 13.9752 11.7018 13.9752 12.5417C13.9752 13.3815 13.3469 14.0114 12.5093 14.0114C11.6716 14.0114 11.0433 13.3815 11.0433 12.5417C11.0433 11.7018 11.6716 11.0719 12.5093 11.0719ZM34.8472 19.2604C34.4283 19.2604 34.0793 18.9105 34.0793 18.4905C34.0793 18.0706 34.4283 17.7907 34.8472 17.7907C35.2661 17.7907 35.6151 18.0706 35.6151 18.4905C35.6151 18.9105 35.2661 19.2604 34.8472 19.2604ZM24.4461 14.0114C23.6084 14.0114 22.9104 13.3815 22.9104 12.5417C22.9104 11.7018 23.6084 11.0719 24.4461 11.0719C25.214 11.0719 25.912 11.7018 25.912 12.5417C25.912 13.3815 25.214 14.0114 24.4461 14.0114ZM24.4461 8.83236C24.0273 8.83236 23.6782 8.48243 23.6782 8.0625C23.6782 7.64257 24.0273 7.29264 24.4461 7.29264C24.865 7.29264 25.1441 7.64257 25.1441 8.0625C25.1441 8.48243 24.865 8.83236 24.4461 8.83236ZM8.04167 23.7396C8.46051 23.7396 8.80954 24.0895 8.80954 24.5095C8.80954 24.9294 8.46051 25.2093 8.04167 25.2093C7.62282 25.2093 7.2738 24.9294 7.2738 24.5095C7.2738 24.0895 7.62282 23.7396 8.04167 23.7396ZM18.4428 34.1676C18.8616 34.1676 19.2106 34.5175 19.2106 34.9375C19.2106 35.3575 18.8616 35.7074 18.4428 35.7074C18.0239 35.7074 17.7447 35.3575 17.7447 34.9375C17.7447 34.5175 18.0239 34.1676 18.4428 34.1676ZM18.4428 8.83236C18.0239 8.83236 17.7447 8.48243 17.7447 8.0625C17.7447 7.64257 18.0239 7.29264 18.4428 7.29264C18.8616 7.29264 19.2106 7.64257 19.2106 8.0625C19.2106 8.48243 18.8616 8.83236 18.4428 8.83236ZM18.4428 14.0114C17.6749 14.0114 16.9769 13.3815 16.9769 12.5417C16.9769 11.7018 17.6749 11.0719 18.4428 11.0719C19.2805 11.0719 19.9785 11.7018 19.9785 12.5417C19.9785 13.3815 19.2805 14.0114 18.4428 14.0114ZM18.4428 22.2699C19.6992 22.2699 20.6766 23.2497 20.6766 24.5095C20.6766 25.6993 19.6992 26.749 18.4428 26.749C17.2561 26.749 16.209 25.6993 16.209 24.5095C16.209 23.2497 17.2561 22.2699 18.4428 22.2699ZM30.3796 22.9697C31.2174 22.9697 31.8455 23.6695 31.8455 24.5095C31.8455 25.2793 31.2174 25.9792 30.3796 25.9792C29.5419 25.9792 28.9137 25.2793 28.9137 24.5095C28.9137 23.6695 29.5419 22.9697 30.3796 22.9697ZM30.3796 28.9886C31.2174 28.9886 31.8455 29.6184 31.8455 30.4583C31.8455 31.2983 31.2174 31.928 30.3796 31.928C29.5419 31.928 28.9137 31.2983 28.9137 30.4583C28.9137 29.6184 29.5419 28.9886 30.3796 28.9886ZM30.3796 17.0208C31.2174 17.0208 31.8455 17.7207 31.8455 18.4905C31.8455 19.3305 31.2174 20.0303 30.3796 20.0303C29.5419 20.0303 28.9137 19.3305 28.9137 18.4905C28.9137 17.7207 29.5419 17.0208 30.3796 17.0208ZM30.3796 11.0719C31.2174 11.0719 31.8455 11.7018 31.8455 12.5417C31.8455 13.3815 31.2174 14.0114 30.3796 14.0114C29.5419 14.0114 28.9137 13.3815 28.9137 12.5417C28.9137 11.7018 29.5419 11.0719 30.3796 11.0719ZM34.8472 23.7396C35.2661 23.7396 35.6151 24.0895 35.6151 24.5095C35.6151 24.9294 35.2661 25.2093 34.8472 25.2093C34.4283 25.2093 34.0793 24.9294 34.0793 24.5095C34.0793 24.0895 34.4283 23.7396 34.8472 23.7396ZM24.4461 28.9886C25.214 28.9886 25.912 29.6184 25.912 30.4583C25.912 31.2983 25.214 31.928 24.4461 31.928C23.6084 31.928 22.9104 31.2983 22.9104 30.4583C22.9104 29.6184 23.6084 28.9886 24.4461 28.9886ZM24.4461 34.1676C24.865 34.1676 25.1441 34.5175 25.1441 34.9375C25.1441 35.3575 24.865 35.7074 24.4461 35.7074C24.0273 35.7074 23.6782 35.3575 23.6782 34.9375C23.6782 34.5175 24.0273 34.1676 24.4461 34.1676ZM18.4428 16.251C19.6992 16.251 20.6766 17.3008 20.6766 18.4905C20.6766 19.7503 19.6992 20.7301 18.4428 20.7301C17.2561 20.7301 16.209 19.7503 16.209 18.4905C16.209 17.3008 17.2561 16.251 18.4428 16.251ZM18.4428 28.9886C19.2805 28.9886 19.9785 29.6184 19.9785 30.4583C19.9785 31.2983 19.2805 31.928 18.4428 31.928C17.6749 31.928 16.9769 31.2983 16.9769 30.4583C16.9769 29.6184 17.6749 28.9886 18.4428 28.9886ZM24.4461 22.2699C25.6329 22.2699 26.6799 23.2497 26.6799 24.5095C26.6799 25.6993 25.6329 26.749 24.4461 26.749C23.1897 26.749 22.2123 25.6993 22.2123 24.5095C22.2123 23.2497 23.1897 22.2699 24.4461 22.2699ZM24.4461 16.251C25.6329 16.251 26.6799 17.3008 26.6799 18.4905C26.6799 19.7503 25.6329 20.7301 24.4461 20.7301C23.1897 20.7301 22.2123 19.7503 22.2123 18.4905C22.2123 17.3008 23.1897 16.251 24.4461 16.251Z" fill="#E5EDFF"/>
<mask id="mask0_1_3" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="50" y="3" width="143" height="37">
<path d="M192.106 3.58333H50.037V39.4167H192.106V3.58333Z" fill="white"/>
</mask>
<g mask="url(#mask0_1_3)">
<mask id="mask1_1_3" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="50" y="3" width="68" height="37">
<path d="M117.051 3.58333H50.037V39.4167H117.051V3.58333Z" fill="white"/>
</mask>
<g mask="url(#mask1_1_3)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M98.4119 13.3108C97.1619 13.3108 96.2196 12.3932 96.2196 11.1768C96.2196 9.97553 97.1619 9.07031 98.4119 9.07031C99.6255 9.07031 100.576 9.99546 100.576 11.1768C100.576 12.3932 99.6459 13.3108 98.4119 13.3108ZM96.5481 29.2413H100.139V15.598H96.5481V29.2413ZM109.826 18.4035C107.719 18.4035 106.191 20.0677 106.191 22.3602C106.191 24.6532 107.731 26.3174 109.853 26.3174C111.925 26.3174 113.487 24.6162 113.487 22.3602C113.487 20.0308 111.981 18.4035 109.826 18.4035ZM109.06 29.7107C105.392 29.7107 102.518 26.4703 102.518 22.3328C102.518 18.2109 105.295 14.9824 108.841 14.9824C110.523 14.9824 111.855 15.5749 112.797 16.7425L112.854 16.8122H113.433V9.24647H117.051V29.3557H113.433V28.0174H112.85L112.794 28.0919C111.979 29.1665 110.723 29.7107 109.06 29.7107ZM90.0177 16.4996V15.0246H93.6089V30.8778C93.6089 33.9014 91.1537 36.3527 88.1256 36.3527H82.8947V32.8993H87.6472C88.941 32.8993 89.9902 31.8514 89.9902 30.5594V27.7047H89.4133L89.3567 27.7735C88.7328 28.5298 87.7441 29.398 85.6178 29.398C81.9496 29.398 79.0764 26.1573 79.0764 22.0196C79.0764 17.8987 81.8656 14.6693 85.4263 14.6693C87.5598 14.6693 88.5918 15.5835 89.3919 16.4398L89.4475 16.4996H90.0177ZM82.7768 22.0196C82.7768 24.3287 84.3054 26.005 86.4113 26.005C88.4833 26.005 90.0458 24.2918 90.0458 22.0196C90.0458 19.7433 88.5171 18.0908 86.4113 18.0908C84.3054 18.0908 82.7768 19.7433 82.7768 22.0196ZM69.898 17.8749C67.9271 17.8749 66.6883 19.2606 66.484 20.6294L66.4517 20.8448H73.2853L73.2576 20.6327C73.0462 19.0348 71.6336 17.8749 69.898 17.8749ZM70.0072 29.6745C65.7889 29.6745 62.7273 26.5826 62.7273 22.3231C62.7273 18.1173 65.8098 14.9457 69.898 14.9457C74.0232 14.9457 76.9044 17.9679 76.9044 22.296V23.1193H66.4526L66.4549 23.3094C66.4826 25.2338 67.8885 26.5262 69.9525 26.5262C71.4398 26.5262 72.6134 25.9107 73.1722 24.8381L76.3794 25.573C75.4585 28.1804 73.135 29.6745 70.0072 29.6745ZM50.037 22.3912C50.037 26.5842 53.0362 29.6277 57.1686 29.6277C58.843 29.6277 60.2503 29.1997 61.721 28.2413L60.486 25.6733C59.5714 26.2004 58.845 26.4072 57.9236 26.4072C55.5213 26.4072 53.7612 25.0751 53.7612 22.3333C53.7612 19.5915 55.5726 18.2589 57.8652 18.2589C58.7783 18.2589 59.4996 18.423 60.4946 18.8623L61.6626 15.9593C60.1445 15.2467 59.0121 14.9805 57.5169 14.9805C53.1829 14.9805 50.037 18.0971 50.037 22.3912Z" fill="#E5EDFF"/>
</g>
<path d="M139.571 16.3006C139.571 17.7554 139.071 18.9678 138.07 19.9377C137.086 20.8908 135.577 21.3674 133.542 21.3674H130.189V28.6667H127.913V11.1836H133.542C135.51 11.1836 137.003 11.6602 138.02 12.6133C139.054 13.5665 139.571 14.7956 139.571 16.3006ZM133.542 19.4862C134.809 19.4862 135.743 19.2102 136.344 18.6584C136.944 18.1066 137.244 17.3206 137.244 16.3006C137.244 14.1434 136.01 13.0648 133.542 13.0648H130.189V19.4862H133.542ZM154.56 14.921V28.6667H152.283V26.6349C151.85 27.3372 151.241 27.8891 150.457 28.2904C149.69 28.6751 148.839 28.8673 147.905 28.8673C146.837 28.8673 145.878 28.65 145.028 28.2152C144.177 27.7637 143.502 27.0948 143.001 26.2085C142.518 25.3222 142.276 24.2436 142.276 22.9727V14.921H144.527V22.6718C144.527 24.0262 144.869 25.0713 145.553 25.8072C146.237 26.5262 147.171 26.8857 148.355 26.8857C149.573 26.8857 150.532 26.5095 151.232 25.757C151.933 25.0045 152.283 23.9093 152.283 22.4711V14.921H154.56ZM160.681 10.105V28.6667H158.404V10.105H160.681ZM169.414 28.8924C168.364 28.8924 167.421 28.7168 166.587 28.3657C165.753 27.9978 165.095 27.4962 164.611 26.8607C164.127 26.2085 163.86 25.4644 163.81 24.6283H166.162C166.229 25.3139 166.546 25.874 167.113 26.3088C167.696 26.7437 168.455 26.961 169.389 26.961C170.257 26.961 170.94 26.7688 171.441 26.3841C171.941 25.9994 172.191 25.5146 172.191 24.9292C172.191 24.3272 171.925 23.8842 171.391 23.5998C170.857 23.2988 170.031 23.0063 168.914 22.7219C167.897 22.4544 167.063 22.1867 166.412 21.9192C165.778 21.6349 165.228 21.2253 164.761 20.6902C164.311 20.1383 164.085 19.4193 164.085 18.533C164.085 17.8307 164.294 17.1869 164.711 16.6016C165.128 16.0163 165.72 15.5565 166.487 15.222C167.254 14.8708 168.13 14.6952 169.114 14.6952C170.632 14.6952 171.858 15.0799 172.792 15.8491C173.726 16.6183 174.226 17.6718 174.293 19.0096H172.016C171.966 18.2906 171.674 17.7136 171.141 17.2788C170.624 16.844 169.923 16.6267 169.039 16.6267C168.222 16.6267 167.571 16.8023 167.088 17.1534C166.604 17.5046 166.362 17.9645 166.362 18.533C166.362 18.9845 166.504 19.3607 166.787 19.6617C167.088 19.9461 167.454 20.1801 167.888 20.3641C168.339 20.5312 168.956 20.7237 169.74 20.941C170.724 21.2085 171.524 21.4762 172.141 21.7437C172.758 21.9945 173.284 22.3792 173.718 22.8975C174.168 23.4158 174.401 24.0931 174.418 24.9292C174.418 25.6817 174.209 26.359 173.793 26.961C173.376 27.563 172.783 28.0396 172.016 28.3907C171.266 28.7253 170.398 28.8924 169.414 28.8924ZM190.141 21.2671C190.141 21.7019 190.116 22.1617 190.066 22.6467H179.108C179.192 24.0012 179.651 25.0631 180.484 25.8322C181.334 26.5847 182.36 26.961 183.561 26.961C184.546 26.961 185.362 26.7353 186.013 26.2838C186.681 25.8156 187.147 25.1967 187.414 24.4276H189.866C189.499 25.7486 188.765 26.8272 187.664 27.6633C186.563 28.4827 185.196 28.8924 183.561 28.8924C182.26 28.8924 181.093 28.5998 180.058 28.0145C179.041 27.4292 178.241 26.6014 177.657 25.5313C177.073 24.4442 176.781 23.1901 176.781 21.7687C176.781 20.3474 177.065 19.1015 177.632 18.0313C178.199 16.9611 178.991 16.1417 180.008 15.5732C181.043 14.9879 182.228 14.6952 183.561 14.6952C184.862 14.6952 186.013 14.9795 187.013 15.5481C188.014 16.1166 188.783 16.9026 189.315 17.9059C189.866 18.8926 190.141 20.0129 190.141 21.2671ZM187.789 20.7905C187.789 19.921 187.598 19.1767 187.214 18.5581C186.831 17.9226 186.306 17.446 185.637 17.1283C184.987 16.7939 184.261 16.6267 183.461 16.6267C182.31 16.6267 181.327 16.9945 180.509 17.7303C179.708 18.4662 179.251 19.4862 179.133 20.7905H187.789Z" fill="#FF5C35" fill-opacity="0.64"/>
</g>
</svg>

`;

// ========================================
// COMPONENT STYLES - ISOLATED SECTIONS
// ========================================

// Chat Toggle Button (Initialization Button)
const CHAT_TOGGLE_STYLES = `
  .chat-toggle {
    /* Position & Layout */
    position: fixed;
    bottom: var(--md-sys-spacing-medium, 20px);
    right: var(--md-sys-spacing-medium, 20px);
    z-index: 1000;
    
    /* Size & Shape */
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    
    /* Visual Design */
    background: #E5EDFF;
    color: var(--md-sys-color-on-primary, white);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    
    /* Content */
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Interaction */
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .chat-toggle:hover {
    background: #E5EDFF;
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
  }

  .chat-toggle:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
    box-shadow: none;
  }

  .chat-toggle:active {
    transform: scale(0.95);
  }

  /* Mobile Responsive */
  @media (max-width: 480px) {
    .chat-toggle {
      width: 50px;
      height: 50px;
      font-size: 24px;
    }
  }
`;

// Chat Container Styles
const CHAT_CONTAINER_STYLES = `
  .chat-container {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 420px;
    height: 600px;
    background: #0f172a url('/texture.png');
    background-size: 200px 200px;
    background-repeat: repeat;
    background-position: 0 0;
    border: 1px solid #334155;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    display: none;
    flex-direction: column;
    z-index: 1000;
    color: #fff;
    overflow: hidden;
    margin-left: 0;
    transition: margin-left 0.4s ease;
  }

  /* Add overlay to ensure text readability over texture */
  .chat-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.8);
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: 480px) {
    .chat-container {
      width: 100vw;
      height: 100vh;
      bottom: 0;
      right: 0;
      border-radius: 0;
    }
  }
`;

// Chat Header Styles
const CHAT_HEADER_STYLES = `
  .chat-header {
    background: #0f172a;
    color: white;
    padding: 20px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #334155;
    position: relative;
    gap: 15px;
  }

  .chat-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 76px;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-top-left-radius: 16px;
    z-index: 0;
  }

  .header-title {
    font-size: 1.5em;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 15px;
    color: #cbd5e1;
    position: relative;
    z-index: 1;
    margin-left: 20px;
  }

  .close-chat {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
    z-index: 1;
  }

  @media (max-width: 480px) {
    .header-title {
      font-size: 1.2em;
    }
  }
`;

// Sessions Sidebar Styles
const SESSIONS_SIDEBAR_STYLES = `
  .toggle-sessions {
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: all 0.2s ease;
    z-index: 1;
  }

  .toggle-sessions:hover {
    background: rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .toggle-sessions:active {
    background: rgba(0, 0, 0, 0.6);
    transform: scale(0.95);
  }

  .sessions-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    background: #1e293b;
    transform: translateX(-100%);
    transition: transform 0.4s ease;
    z-index: 2;
    padding: 20px;
    border-right: 1px solid #334155;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sessions-list.active {
    transform: translateX(0);
  }

  .sessions-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .sessions-title {
    font-size: 0.9em;
    font-weight: 500;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .session-item {
    padding: 15px 20px;
    cursor: pointer;
    color: #fff;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 1.1em;
    line-height: 1.4;
    margin: 0 -20px;
  }

  .session-item::before {
    content: '';
    position: absolute;
    left: 0;
    width: 4px;
    height: 0;
    background: #2563eb;
    transition: height 0.3s ease;
  }

  .session-item:hover {
    background: #334155;
  }

  .session-item:hover::before {
    height: 100%;
  }

  .session-item.active {
    background: #334155;
    color: #60a5fa;
    font-weight: 500;
  }

  .session-item.active::before {
    height: 100%;
    background: #2563eb;
  }

  .new-session-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 28px;
    height: 28px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    padding: 0;
    line-height: 1;
  }

  .new-session-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .new-session-btn:active {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0.95);
  }

  .end-history {
    color: #64748b;
    text-align: center;
    padding: 20px;
    font-style: italic;
    margin-top: auto;
    font-size: 0.9em;
  }

  /* Custom scrollbar for sessions list */
  .sessions-list::-webkit-scrollbar {
    width: 6px;
  }

  .sessions-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .sessions-list::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .sessions-list:hover::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .sessions-list {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  @media (max-width: 480px) {
    .toggle-sessions {
      width: 28px;
      height: 28px;
      font-size: 18px;
    }
  }
`;

// Chat Body Styles
const CHAT_BODY_STYLES = `
  .chat-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    color: #cbd5e1;
    font-size: 1.1em;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .message {
    display: flex;
    align-items: flex-start;
    max-width: 85%;
    animation: fadeInUp 0.3s ease;
  }

  .message.user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }

  .message.bot {
    align-self: flex-start;
  }

  .message-avatar {
    display: none;
  }

  .message-content {
    background: rgba(255, 255, 255, 0.1);
    padding: 12px 16px;
    border-radius: 18px;
    position: relative;
    word-wrap: break-word;
    max-width: 100%;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .message.user .message-content {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    border-bottom-right-radius: 6px;
  }

  .message.bot .message-content {
    background: rgba(203, 213, 225, 0.1);
    color: #cbd5e1;
    border-bottom-left-radius: 6px;
    border: 1px solid rgba(203, 213, 225, 0.2);
  }

  .message-content strong {
    color: #2563eb;
    font-weight: bold;
  }

  /* Markdown Elements Styling */
  .md-h1, .md-h2, .md-h3 {
    color: white;
    margin: 8px 0 4px 0;
    font-weight: bold;
    line-height: 1.3;
  }

  /* Override strong color inside headings to keep them white */
  .md-h1 strong, .md-h2 strong, .md-h3 strong {
    color: white;
  }

  .md-h1 { 
    font-size: 1.4em;
    border-bottom: 2px solid rgba(37, 99, 235, 0.3);
    padding-bottom: 8px;
  }
  
  .md-h2 { 
    font-size: 1.25em;
    border-bottom: 1px solid rgba(37, 99, 235, 0.2);
    padding-bottom: 4px;
  }
  
  .md-h3 { 
    font-size: 1.1em; 
  }

  .md-hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.5), transparent);
    margin: 16px 0;
  }

  .md-code-block {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px;
    border-radius: 8px;
    margin: 8px 0;
    overflow-x: auto;
    font-family: 'Courier New', 'Monaco', monospace;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 100%;
    word-break: break-all;
  }

  .md-code-block code {
    color: #e2e8f0;
    background: none;
    padding: 0;
  }

  .md-inline-code {
    background: rgba(37, 99, 235, 0.15);
    color: #2563eb;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', 'Monaco', monospace;
    font-size: 0.9em;
    border: 1px solid rgba(37, 99, 235, 0.2);
  }

  .md-link {
    color: #60a5fa;
    text-decoration: underline;
    transition: color 0.2s ease;
  }

  .md-link:hover {
    color: #93c5fd;
  }

  .message-content {
    counter-reset: list-counter; /* Reset counter for each message */
  }

  .md-list-item, .md-numbered-item {
    margin: 4px 0;
    padding-left: 20px;
    position: relative;
    list-style: none; /* Remove default browser bullet points */
    display: block;
  }

  .md-list-item::before {
    content: '•';
    color: white;
    font-weight: bold;
    position: absolute;
    left: 8px;
    top: 0;
  }

  .md-numbered-item {
    counter-increment: list-counter;
  }

  .md-numbered-item::before {
    content: counter(list-counter) '.';
    color: white;
    font-weight: bold;
    position: absolute;
    left: 4px;
    top: 0;
    min-width: 16px;
  }

  .message-text {
    margin: 0;
    line-height: 1.4;
  }

  .message-time {
    font-size: 0.75em;
    opacity: 0.6;
    margin-top: 4px;
  }

  .loading-indicator {
    display: flex;
    align-items: flex-start;
    max-width: 85%;
    align-self: flex-start;
  }

  .loading-indicator .message-avatar {
    display: none;
  }

  .loading-indicator .message-content {
    background: rgba(203, 213, 225, 0.1);
    padding: 12px 16px;
    border-radius: 18px;
    border-bottom-left-radius: 6px;
    border: 1px solid rgba(203, 213, 225, 0.2);
    color: #cbd5e1;
  }

  .typing-dots {
    display: inline-flex;
    gap: 3px;
  }

  .typing-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    animation: typing 1.4s infinite;
  }

  .typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.5;
    }
    30% {
      transform: translateY(-8px);
      opacity: 1;
    }
  }

  /* Custom scrollbar for chat body */
  .chat-body::-webkit-scrollbar {
    width: 6px;
  }

  .chat-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-body::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .chat-body:hover::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .chat-body {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  @media (max-width: 480px) {
    .message {
      max-width: 95%;
    }

    .message-content {
      padding: 10px 12px;
      font-size: 0.95em;
    }

    /* Adjust list spacing for mobile */
    .md-list-item, .md-numbered-item {
      padding-left: 18px;
      margin: 2px 0;
    }

    .md-list-item::before {
      left: 6px;
    }

    .md-numbered-item::before {
      left: 2px;
    }
  }
`;

// Chat Input Styles
const CHAT_INPUT_STYLES = `
  .chat-input {
    border-top: 1px solid #334155;
    padding: 15px 20px;
    display: flex;
    gap: 12px;
    background: rgba(15, 23, 42, 0.5);
  }

  .chat-input input {
    flex: 1;
    padding: 15px;
    background: rgba(203, 213, 225, 0.1);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-size: 1em;
    transition: all 0.3s ease;
  }

  .chat-input input::placeholder {
    color: #94a3b8;
  }

  .chat-input input:focus {
    background: rgba(203, 213, 225, 0.15);
    outline: none;
  }

  .chat-input .send-icon {
    background: #2563eb;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    padding: 10px;
    cursor: pointer;
    opacity: 0.4;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
  }

  .chat-input .send-icon:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  .chat-input .send-icon:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
  }

  .chat-input .send-icon.active {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 480px) {
    .chat-input {
      padding: 10px;
    }

    .chat-input input {
      padding: 12px;
    }

    .chat-input .send-icon {
      width: 40px;
      height: 40px;
      padding: 8px;
    }
  }
`;

// Overlay and Loading Styles
const OVERLAY_LOADING_STYLES = `
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .overlay.active {
    opacity: 1;
    pointer-events: auto;
  }
`;


class MyChatbot extends HTMLElement {
    constructor() {
      super();
      const title = this.getAttribute('title') || defaultTitle;
      this.attachShadow({ mode: 'open' });
      
      // API Configuration
      this.apiEndpoint = `${API_BASE_URL}/chat`;
      this.sessionApiBase = `${API_BASE_URL}/session`;
      this.userId = '3A7F5D627D0F48CF3F52';
      
      // Data arrays - will be populated from API
      this.sessions = [];
      this.chatHistory = [];
      
      this.currentSession = null;
      this.isLoading = false;
      this.STORAGE_KEY = 'pulse-chat-modal-state';
  
      // Styles and template - All components combined
      const style = document.createElement('style');
      style.textContent = `
        ${CHAT_TOGGLE_STYLES}
        ${CHAT_CONTAINER_STYLES}
        ${CHAT_HEADER_STYLES}
        ${SESSIONS_SIDEBAR_STYLES}
        ${CHAT_BODY_STYLES}
        ${CHAT_INPUT_STYLES}
        ${OVERLAY_LOADING_STYLES}
      `;
  
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="chat-container">
          <div class="chat-header">
            <button class="toggle-sessions" aria-label="Toggle sessions">${BURGER_ICON_SVG}</button>
            <div class="header-title">${BRAND_LOGO_SVG}</div>
            <button class="close-chat" title="Fermer">×</button>
          </div>
          <div class="sessions-list">
            <div class="sessions-header">
              <div class="sessions-title">Sessions</div>
              <button class="new-session-btn">+</button>
            </div>
            <div class="end-history">Vous avez atteint la fin de votre historique de chat.</div>
          </div>
          <div class="overlay"></div>
          <div class="chat-body" id="chatBody">
          </div>
          <div class="chat-input">
            <input type="text" id="chatInput" placeholder="Tapez un message..." />
            <button id="sendBtn" class="send-icon" aria-label="Send">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M12 5L19 12M12 5L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <button class="chat-toggle">
          ${AVATAR_SVG}
        </button>
      `;

      this.shadowRoot.append(style, wrapper);
    }

    // Save modal state to session storage
    saveModalState(isOpen) {
      try {
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify({ isOpen }));
      } catch (error) {
        console.warn('Failed to save modal state to session storage:', error);
      }
    }

    // Load modal state from session storage
    loadModalState() {
      try {
        const saved = sessionStorage.getItem(this.STORAGE_KEY);
        if (saved) {
          const state = JSON.parse(saved);
          return state.isOpen || false;
        }
      } catch (error) {
        console.warn('Failed to load modal state from session storage:', error);
      }
      return false;
    }

    // New method to query session history
    getSessionHistory(sessionId) {
      const historyEntry = this.chatHistory.find(entry => entry.id === sessionId);
      return historyEntry ? historyEntry.request : [];
    }

    // Save current session ID to session storage
    saveCurrentSessionId(sessionId) {
      try {
        sessionStorage.setItem('pulse-current-session-id', sessionId);
      } catch (error) {
        console.warn('Failed to save current session ID to session storage:', error);
      }
    }

    // Load current session ID from session storage
    loadCurrentSessionId() {
      try {
        return sessionStorage.getItem('pulse-current-session-id');
      } catch (error) {
        console.warn('Failed to load current session ID from session storage:', error);
      }
      return null;
    }

    // Clear current session ID from session storage
    clearCurrentSessionId() {
      try {
        sessionStorage.removeItem('pulse-current-session-id');
      } catch (error) {
        console.warn('Failed to clear current session ID from session storage:', error);
      }
    }

    // Set current session and persist to storage
    setCurrentSession(session) {
      this.currentSession = session;
      if (session && session.id && !session.virtual) {
        this.saveCurrentSessionId(session.id);
        console.log('Saved current session ID to storage:', session.id);
      } else if (session && session.virtual) {
        this.clearCurrentSessionId();
        console.log('Virtual session set, no storage persistence');
      } else {
        this.clearCurrentSessionId();
      }
    }

    // API Methods
    async fetchSessions() {
      try {
        const response = await fetch(`${this.sessionApiBase}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch sessions: ${response.status}`);
        }

        const sessions = await response.json();
        console.log('Fetched sessions:', sessions); // Debug log
        
        // Normalize sessions to use 'id' field consistently
        const normalizedSessions = sessions.map(session => ({
          id: session.session_id || session.id,
          name: session.name,
          session_id: session.session_id || session.id // Keep original field for reference
        }));
        
        this.sessions = normalizedSessions;
        return normalizedSessions;
      } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error;
      }
    }

    async fetchSessionHistory(sessionId) {
      try {
        const url = `${this.sessionApiBase}/${sessionId}`;
        console.log('Fetching session history from URL:', url); // Debug log
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch session history: ${response.status}`);
        }

        const sessionData = await response.json();
        
        // Store in local cache
        const existingIndex = this.chatHistory.findIndex(entry => entry.id === sessionId);
        if (existingIndex >= 0) {
          this.chatHistory[existingIndex] = sessionData;
        } else {
          this.chatHistory.push(sessionData);
        }
        
        return sessionData;
      } catch (error) {
        console.error('Error fetching session history:', error);
        throw error;
      }
    }

    async createSession(name) {
      try {
        const response = await fetch(`${this.sessionApiBase}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.userId,
            name: name
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to create session: ${response.status}`);
        }

        const newSession = await response.json();
        console.log('Created new session:', newSession); // Debug log
        
        // Validate that we have a session ID
        if (!newSession.session_id) {
          console.error('New session created but no session_id returned:', newSession);
          throw new Error('Session created but no session_id returned from API');
        }
        
        // Normalize the session object to use 'id' internally for consistency
        const normalizedSession = {
          id: newSession.session_id,
          name: newSession.name,
          session_id: newSession.session_id // Keep original field for reference
        };
        
        // Add to local sessions array
        this.sessions.unshift(normalizedSession);
        
        // Create empty history entry
        this.chatHistory.unshift({
          id: normalizedSession.id,
          name: normalizedSession.name,
          request: []
        });
        
        return normalizedSession;
      } catch (error) {
        console.error('Error creating session:', error);
        throw error;
      }
    }

    // Set modal visibility with state persistence
    setModalVisibility(isOpen) {
      const chat = this.shadowRoot.querySelector('.chat-container');
      const toggle = this.shadowRoot.querySelector('.chat-toggle');
      
      if (isOpen) {
        chat.style.display = 'flex';
        // Responsive toggle button behavior
        if (window.innerWidth <= 480) {
          toggle.style.display = 'none';
        } else {
          toggle.style.zIndex = '1';
        }
      } else {
        chat.style.display = 'none';
        toggle.style.display = 'flex';
        toggle.style.zIndex = '1000';
      }
      
      // Save state to session storage
      this.saveModalState(isOpen);
    }

    async sendMessage() {
      const chatInput = this.shadowRoot.getElementById('chatInput');
      const chatBody = this.shadowRoot.getElementById('chatBody');
      const sendBtn = this.shadowRoot.getElementById('sendBtn');
      
      const msg = chatInput.value.trim();
      if (!msg || this.isLoading) return;

      // Clear input and disable send button
      chatInput.value = '';
      sendBtn.classList.remove('active');
      this.isLoading = true;

      // Add user message to UI
      this.addMessageToUI('Vous', msg);

      // Show loading indicator
      this.showLoadingIndicator(chatBody);

      try {
        // Check if this is a virtual session (needs to be created)
        if (this.currentSession?.virtual) {
          console.log('Creating session for first message...');
          
          // Generate session name from first 32 characters of message
          const sessionName = msg.length > 32 ? msg.substring(0, 32).trim() + '...' : msg.trim();
          
          // Create real session
          const realSession = await this.createSession(sessionName);
          console.log('Created real session:', realSession);
          
          // Update current session to real session
          this.setCurrentSession(realSession);
          
          // Update UI with new session
          this.updateSessionsListUI();
          
          // Mark new session as active in UI
          const newSessionElement = this.shadowRoot.querySelector(`[data-session-id="${realSession.id}"]`);
          if (newSessionElement) {
            this.shadowRoot.querySelectorAll('.session-item').forEach(si => si.classList.remove('active'));
            newSessionElement.classList.add('active');
          }
        }

        // Prepare request body with current session ID
        const requestBody = { message: msg };
        
        // Add the current session ID if we have one
        if (this.currentSession && this.currentSession.id && !this.currentSession.virtual) {
          requestBody.session_id = this.currentSession.id;
          console.log('Adding session_id to chat request:', this.currentSession.id);
        }

        // Make API call
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Create new message entry for chat history
        const newMessageEntry = {
          user_input: msg,
          status: 'success',
          output: { data: { content: data.response } }
        };

        // Find or create history entry for current session
        let historyEntry = this.chatHistory.find(entry => entry.id === this.currentSession.id);
        if (!historyEntry) {
          historyEntry = { 
            id: this.currentSession.id, 
            name: this.currentSession.name, 
            request: [] 
          };
          this.chatHistory.push(historyEntry);
        }

        // Add the new message to history
        historyEntry.request.push(newMessageEntry);

        // Remove loading indicator and add bot response
        this.removeLoadingIndicator(chatBody);
        this.addMessageToUI('Bot', data.response);

      } catch (error) {
        console.error('Error sending message:', error);
        
        this.removeLoadingIndicator(chatBody);
        this.addMessageToUI('Bot', 'Désolé, quelque chose s\'est mal passé. Veuillez réessayer plus tard.');
      } finally {
        this.isLoading = false;
      }
    }

    addMessageToUI(sender, message) {
      const chatBody = this.shadowRoot.getElementById('chatBody');
      const messageDiv = document.createElement('div');
      const isUser = sender === 'Vous';
      
      messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
      
      const content = document.createElement('div');
      content.className = 'message-content';
      
      const text = document.createElement('div');
      text.className = 'message-text';
      text.innerHTML = this.formatMessage(message);
      
      content.appendChild(text);
      messageDiv.appendChild(content);
      
      chatBody.appendChild(messageDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    formatMessage(message) {
      // Enhanced markdown-to-HTML conversion with security
      return message
        // Escape HTML first for security (but preserve emojis and special chars)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        
        // Horizontal rules
        .replace(/^---+$/gm, '<hr class="md-hr">')
        
        // Headers (support emojis)
        .replace(/^### (.*$)/gm, '<h3 class="md-h3">$1</h3>')
        .replace(/^## (.*$)/gm, '<h2 class="md-h2">$1</h2>')
        .replace(/^# (.*$)/gm, '<h1 class="md-h1">$1</h1>')
        
        // Code blocks (multi-line)
        .replace(/```([\s\S]*?)```/g, '<pre class="md-code-block"><code>$1</code></pre>')
        
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>')
        
        // Bold and italic (nested support)
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        
        // Links
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" class="md-link">$1</a>')
        
        // Lists (unordered) - handle both - and *
        .replace(/^[\s]*[-*] (.*$)/gm, '<li class="md-list-item">$1</li>')
        
        // Numbered lists
        .replace(/^[\s]*\d+\. (.*$)/gm, '<li class="md-numbered-item">$1</li>')
        
        // Line breaks (preserve double breaks for paragraphs)
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
    }

    showLoadingIndicator(chatBody) {
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'loading-indicator';
      
      const content = document.createElement('div');
      content.className = 'message-content';
      
      const typingDots = document.createElement('div');
      typingDots.className = 'typing-dots';
      typingDots.innerHTML = '<span></span><span></span><span></span>';
      
      content.appendChild(typingDots);
      loadingDiv.appendChild(content);
      
      chatBody.appendChild(loadingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    removeLoadingIndicator(chatBody) {
      const loadingIndicator = chatBody.querySelector('.loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
    }

    async loadSessionMessages() {
      const chatBody = this.shadowRoot.getElementById('chatBody');
      chatBody.innerHTML = '';
      
      if (!this.currentSession) {
        this.addMessageToUI('Bot', 'Bonjour! 😊 Comment puis-je vous aider aujourd\'hui?');
        return;
      }
      
      console.log('Loading session messages for session:', this.currentSession); // Debug log
      
      // Check if this is a virtual session
      if (this.currentSession.virtual) {
        console.log('Virtual session, showing welcome message'); // Debug log
        this.addMessageToUI('Bot', 'Bonjour! 😊 Comment puis-je vous aider aujourd\'hui?');
        return;
      }
      
      // Check if this is a newly created session with no ID or local history entry
      const historyEntry = this.chatHistory.find(entry => entry.id === this.currentSession.id);
      if (!this.currentSession.id || (historyEntry && historyEntry.request.length === 0)) {
        console.log('New session or no history, showing welcome message'); // Debug log
        this.addMessageToUI('Bot', 'Bonjour! 😊 Comment puis-je vous aider aujourd\'hui?');
        return;
      }
      
      // Show loading indicator while fetching session history
      this.showLoadingIndicator(chatBody);
      
      try {
        // Fetch session history from API
        const sessionData = await this.fetchSessionHistory(this.currentSession.id);
        
        // Remove loading indicator
        this.removeLoadingIndicator(chatBody);
        
        if (sessionData.request.length === 0) {
          this.addMessageToUI('Bot', 'Bonjour! 😊 Comment puis-je vous aider aujourd\'hui?');
        } else {
          // Load messages from fetched history
          sessionData.request.forEach(entry => {
            // Add user message
            this.addMessageToUI('Vous', entry.user_input);
            
            // Add bot response based on status
            if ((entry.status === 'success' || entry.status === 'completed') && entry.output?.data?.content) {
              this.addMessageToUI('Bot', entry.output.data.content);
            } else if (entry.status === 'fail' || entry.status === 'error') {
              // Show fallback message for failed requests
              this.addMessageToUI('Bot', 'Désolé, quelque chose s\'est mal passé. Veuillez réessayer plus tard.');
            }
          });
        }
      } catch (error) {
        console.error('Error loading session messages:', error);
        this.removeLoadingIndicator(chatBody);
        this.addMessageToUI('Bot', 'Erreur lors du chargement de l\'historique de la session.');
      }
    }

    updateSessionsListUI() {
      const sessionsList = this.shadowRoot.querySelector('.sessions-list');
      const endHistory = sessionsList.querySelector('.end-history');
      
      // Remove existing session items
      sessionsList.querySelectorAll('.session-item').forEach(item => item.remove());
      
      // Add sessions from API
      this.sessions.forEach(session => {
        const sessionElement = document.createElement('div');
        sessionElement.className = 'session-item';
        sessionElement.dataset.sessionId = session.id;
        sessionElement.textContent = session.name;
        
        // Add click handler
        sessionElement.addEventListener('click', async () => {
          this.setCurrentSession(session);
          sessionsList.classList.remove('active');
          this.shadowRoot.querySelector('.toggle-sessions').classList.remove('active');
          this.shadowRoot.querySelector('.overlay').classList.remove('active');
          
          // Remove active class from all items
          sessionsList.querySelectorAll('.session-item').forEach(si => si.classList.remove('active'));
          // Add active class to clicked item
          sessionElement.classList.add('active');
          
          // Load conversation history from API
          await this.loadSessionMessages();
        });
        
        // Insert before end history
        sessionsList.insertBefore(sessionElement, endHistory);
      });
    }

    async initializeSessions() {
      try {
        // Fetch sessions from API
        await this.fetchSessions();
        
        // Update UI with fetched sessions
        this.updateSessionsListUI();
        
        // Try to restore saved session
        const savedSessionId = this.loadCurrentSessionId();
        if (savedSessionId) {
          const savedSession = this.sessions.find(s => s.id === savedSessionId);
          if (savedSession) {
            this.setCurrentSession(savedSession);
            // Mark as active in UI
            const sessionElement = this.shadowRoot.querySelector(`[data-session-id="${savedSession.id}"]`);
            if (sessionElement) {
              sessionElement.classList.add('active');
            }
          }
        }
        
        // Fallback to first session if no saved session
        if (!this.currentSession && this.sessions.length > 0) {
          this.setCurrentSession(this.sessions[0]);
          // Mark first session as active
          const firstSessionElement = this.shadowRoot.querySelector('.session-item');
          if (firstSessionElement) {
            firstSessionElement.classList.add('active');
          }
        } else if (!this.currentSession && this.sessions.length === 0) {
          // No sessions exist, create a virtual session
          console.log('No sessions found, creating virtual session');
          const virtualSession = {
            virtual: true,
            name: 'Nouvelle conversation',
            id: `virtual_${Date.now()}`
          };
          this.setCurrentSession(virtualSession);
        }
        
        // Load initial session messages
        await this.loadSessionMessages();
        
      } catch (error) {
        console.error('Error initializing sessions:', error);
        // Show fallback message if API fails
        this.addMessageToUI('Bot', 'Erreur lors du chargement des sessions. Bonjour! 😊 Comment puis-je vous aider?');
      }
    }
  
    connectedCallback() {
      const toggle = this.shadowRoot.querySelector('.chat-toggle');
      const chat = this.shadowRoot.querySelector('.chat-container');
      const sendBtn = this.shadowRoot.getElementById('sendBtn');
      const chatInput = this.shadowRoot.getElementById('chatInput');
      const chatBody = this.shadowRoot.getElementById('chatBody');
      const toggleSessions = this.shadowRoot.querySelector('.toggle-sessions');
      const sessionsList = this.shadowRoot.querySelector('.sessions-list');
      const overlay = this.shadowRoot.querySelector('.overlay');
      const closeBtn = this.shadowRoot.querySelector('.close-chat');
      const newSessionBtn = this.shadowRoot.querySelector('.new-session-btn');

      // Restore modal state from session storage
      const savedState = this.loadModalState();
      if (savedState) {
        this.setModalVisibility(true);
      }

      toggle.addEventListener('click', () => {
        const isCurrentlyOpen = chat.style.display === 'flex';
        this.setModalVisibility(!isCurrentlyOpen);
      });

      closeBtn.addEventListener('click', () => {
        this.setModalVisibility(false);
      });

      toggleSessions.addEventListener('click', () => {
        sessionsList.classList.toggle('active');
        toggleSessions.classList.toggle('active');
        overlay.classList.toggle('active');
      });

      overlay.addEventListener('click', () => {
        sessionsList.classList.remove('active');
        toggleSessions.classList.remove('active');
        overlay.classList.remove('active');
      });

      sendBtn.addEventListener('click', () => {
        this.sendMessage();
      });

      chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.sendMessage();
        }
      });

      // Enable/disable send icon based on input content
      chatInput.addEventListener('input', () => {
        if (chatInput.value.trim()) {
          sendBtn.classList.add('active');
        } else {
          sendBtn.classList.remove('active');
        }
      });

      // Add new session functionality
      newSessionBtn.addEventListener('click', async () => {
        try {
          console.log('Creating virtual session...');
          
          // Create virtual session (no API call yet)
          const virtualSession = {
            virtual: true,
            name: 'Nouvelle conversation',
            id: `virtual_${Date.now()}` // Temporary ID for UI purposes
          };
          
          // Set as current session
          this.setCurrentSession(virtualSession);
          
          // Close sidebar
          sessionsList.classList.remove('active');
          toggleSessions.classList.remove('active');
          overlay.classList.remove('active');
          
          // Remove active class from all real sessions
          this.shadowRoot.querySelectorAll('.session-item').forEach(si => si.classList.remove('active'));
          
          // Show empty conversation with welcome message
          const chatBody = this.shadowRoot.getElementById('chatBody');
          chatBody.innerHTML = '';
          this.addMessageToUI('Bot', 'Bonjour! 😊 Comment puis-je vous aider aujourd\'hui?');
          
        } catch (error) {
          console.error('Error creating virtual session:', error);
          // Show error message to user
          const chatBody = this.shadowRoot.getElementById('chatBody');
          this.addMessageToUI('Bot', 'Erreur lors de la création d\'une nouvelle session.');
        }
      });

      // Initialize sessions from API
      this.initializeSessions();
    }
  }
  
customElements.define('my-chat', MyChatbot);
  
// Auto-insert into the page
const existing = document.querySelector('my-chat');
if (!existing) {
  const chatbot = document.createElement('my-chat');
  chatbot.setAttribute('title', defaultTitle);
  document.body.appendChild(chatbot);
}