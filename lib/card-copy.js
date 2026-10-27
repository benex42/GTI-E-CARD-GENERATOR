export const cardCopy = {
  en: {
    welcome: { heading: ['Welcome', 'on board'], celebration: 'WE’RE GLAD YOU’RE HERE', message: 'We are delighted to welcome you to {subsidiary}. Here’s to an exciting journey ahead.' },
    anniversary: { heading: ['Happy work', 'anniversary'], celebration: 'WE’RE CELEBRATING YOU', message: 'Thank you for the energy, commitment, and care you bring to {subsidiary} every day.' },
    celebration: { heading: ['Here’s to', 'you'], celebration: 'A MOMENT TO CELEBRATE', message: 'Wishing you a brilliant day and every success in the wonderful things ahead with {subsidiary}.' },
    signature: 'With warm wishes,', footer: 'GROWING TOGETHER · {subsidiary}', toast: 'Your card is ready to download.'
  },
  fr: {
    welcome: { heading: ['Bienvenue', 'à bord'], celebration: 'NOUS SOMMES HEUREUX DE VOUS ACCUEILLIR', message: 'Nous sommes ravis de vous accueillir chez {subsidiary}. Nous vous souhaitons une belle aventure.' },
    anniversary: { heading: ['Joyeux', 'anniversaire pro'], celebration: 'NOUS VOUS CÉLÉBRONS', message: 'Merci pour votre énergie, votre engagement et votre contribution à {subsidiary} chaque jour.' },
    celebration: { heading: ['À votre', 'succès'], celebration: 'UN MOMENT À CÉLÉBRER', message: 'Nous vous souhaitons une belle journée et beaucoup de succès pour la suite avec {subsidiary}.' },
    signature: 'Avec tous nos vœux,', footer: 'GRANDIR ENSEMBLE · {subsidiary}', toast: 'Votre carte est prête à être téléchargée.'
  },
  pt: {
    welcome: { heading: ['Bem-vindo', 'a bordo'], celebration: 'ESTAMOS FELIZES POR TÊ-LO AQUI', message: 'É com muito prazer que lhe damos as boas-vindas à {subsidiary}. Desejamos-lhe uma ótima jornada.' },
    anniversary: { heading: ['Feliz aniversário', 'de trabalho'], celebration: 'ESTAMOS A CELEBRAR CONSIGO', message: 'Obrigado pela energia, dedicação e cuidado que traz a {subsidiary} todos os dias.' },
    celebration: { heading: ['Um brinde', 'a si'], celebration: 'UM MOMENTO PARA CELEBRAR', message: 'Desejamos-lhe um dia excelente e muito sucesso nos próximos passos com {subsidiary}.' },
    signature: 'Com os melhores votos,', footer: 'CRESCEMOS JUNTOS · {subsidiary}', toast: 'O seu cartão está pronto para descarregar.'
  }
};

export function withSubsidiary(copy, subsidiaryName = 'GTI Holding') {
  const resolve = (text) => text?.replaceAll('{subsidiary}', subsidiaryName);
  return { ...copy, message: resolve(copy.message), footer: resolve(copy.footer) };
}
