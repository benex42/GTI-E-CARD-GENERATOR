import africanIndustrialSolutionsLogo from '../assets/African_Industrial_Solution.png';
import africanoElectroLogo from '../assets/Africano_Electro.png';
import gtiBankLogo from '../assets/GTI_Bank.png';
import gtiFoundationLogo from '../assets/GTI_Foundation.png';
import gtiHealthcareLogo from '../assets/GTI_Health_Care.png';
import gtiNaturalResourcesLogo from '../assets/GTI_Natural_Resources.png';
import gtiPropertiesLogo from '../assets/GTI_Properties.png';
import gtiSwitchLogo from '../assets/GTI_Switch.png';
import gtiTelecomLogo from '../assets/GTI_Telecom.png';
import gtInvestLogo from '../assets/GT_Invest.png';
import goldCoastPioneerLogo from '../assets/Gold_Coast_Pioneer_Construction.png';
import katonLogo from '../assets/KATON.png';
import kaTechnologiesLogo from '../assets/KA_Technologies.png';
import lmsGhanaLogo from '../assets/LMS_Ghana.png';
import passLogo from '../assets/PASS.png';
import passRideLogo from '../assets/PASS_Ride.png';
import passmallLogo from '../assets/passmall.png';
import saoPayLogo from '../assets/sao-pay-logo.png';
import gtiHoldingLogo from '../assets/gti-holding-logo.png';

export const subsidiaries = [
  { id: 'gti-holdings', name: 'GTI Holdings', mark: 'GTI', label: 'HOLDINGS', logo: gtiHoldingLogo },
  { id: 'ka-technologies', name: 'KA Technologies', mark: 'KA', label: 'TECHNOLOGIES', logo: kaTechnologiesLogo },
  { id: 'katon', name: 'KATON', mark: 'KATON', label: '', logo: katonLogo },
  { id: 'gti-healthcare', name: 'GTI Healthcare', mark: 'GTI', label: 'HEALTHCARE', logo: gtiHealthcareLogo },
  { id: 'gti-properties', name: 'GTI Properties', mark: 'GTI', label: 'PROPERTIES', logo: gtiPropertiesLogo },
  { id: 'ais', name: 'African Industrial Solutions (AIS)', mark: 'AIS', label: 'AFRICAN INDUSTRIAL SOLUTIONS', logo: africanIndustrialSolutionsLogo },
  { id: 'gnrl', name: 'GTI Natural Resources Limited (GNRL)', mark: 'GNRL', label: 'NATURAL RESOURCES', logo: gtiNaturalResourcesLogo },
  { id: 'ael', name: 'Africano Electro Limited (AEL)', mark: 'AEL', label: 'AFRICANO ELECTRO', logo: africanoElectroLogo },
  { id: 'gcpcl', name: 'Gold Coast Pioneer Construction Limited (GCPCL)', mark: 'GCPCL', label: 'GOLD COAST PIONEER', logo: goldCoastPioneerLogo },
  { id: 'pass', name: 'PASS', mark: 'PASS', label: '', logo: passLogo },
  { id: 'passmall', name: 'Passmall', mark: 'PASS', label: 'MALL', logo: passmallLogo },
  { id: 'gti-switch', name: 'GTI Switch', mark: 'GTI', label: 'SWITCH', logo: gtiSwitchLogo },
  { id: 'gti-bank', name: 'GTI Bank', mark: 'GTI', label: 'BANK', logo: gtiBankLogo },
  { id: 'lms-ghana', name: 'LMS Ghana', mark: 'LMS', label: 'GHANA', logo: lmsGhanaLogo },
  { id: 'gt-invest', name: 'GT Invest', mark: 'GT', label: 'INVEST', logo: gtInvestLogo },
  { id: 'gti-telecom', name: 'GTI Telecom', mark: 'GTI', label: 'TELECOM', logo: gtiTelecomLogo },
  { id: 'gti-foundation', name: 'GTI Foundation', mark: 'GTI', label: 'FOUNDATION', logo: gtiFoundationLogo },
  { id: 'pass-ride', name: 'PASS Ride', mark: 'PASS', label: 'RIDE', logo: passRideLogo },
  { id: 'sao-pay', name: 'SAO Pay', mark: 'SAO', label: 'PAY', logo: saoPayLogo }
];

export function getSubsidiary(id) {
  return subsidiaries.find((subsidiary) => subsidiary.id === id);
}
