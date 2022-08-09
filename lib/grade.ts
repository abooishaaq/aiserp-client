export const numToGrade = (num: string): string => {
  switch (num) {
    case "1":
      return "FIRST";
    case "2":
      return "SECOND";
    case "3":
      return "THIRD";
    case "4":
      return "FOURTH";
    case "5":
      return "FIFTH";
    case "6":
      return "SIXTH";
    case "7":
      return "SEVENTH";
    case "8":
      return "EIGHTH";
    case "9":
      return "NINTH";
    case "10":
      return "TENTH";
    case "11":
      return "ELEVENTH";
    case "12":
      return "TWELFTH";
    default:
      return num;
  }
};

export const gradeToRoman = (grade: string): string => {
  switch (grade) {
    case "FIRST":
      return "I";
    case "SECOND":
      return "II";
    case "THIRD":
      return "III";
    case "FOURTH":
      return "IV";
    case "FIFTH":
      return "V";
    case "SIXTH":
      return "VI";
    case "SEVENTH":
      return "VII";
    case "EIGHTH":
      return "VIII";
    case "NINTH":
      return "IX";
    case "TENTH":
      return "X";
    case "ELEVENTH":
      return "XI";
    case "TWELFTH":
      return "XII";
    default:
      return grade;
  }
};

export const simplifyGrade = (grade: string): string => {
  switch (grade) {
    case "KINDERGARDEN":
      return "KG";
    case "SR_NURSERY":
      return "SENIOR_NURSERY";
    case "FIRST":
      return "1";
    case "SECOND":
      return "2";
    case "THIRD":
      return "3";
    case "FOURTH":
      return "4";
    case "FIFTH":
      return "5";
    case "SIXTH":
      return "6";
    case "SEVENTH":
      return "7";
    case "EIGHTH":
      return "8";
    case "NINTH":
      return "9";
    case "TENTH":
      return "10";
    case "ELEVENTH":
      return "11";
    case "TWELFTH":
      return "12";
    default:
      return grade;
  }
};
