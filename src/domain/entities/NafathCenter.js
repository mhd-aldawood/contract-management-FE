export class NafathCenter {
  constructor({
    id = null,
    type = 'nafath-center',
    agreementNumber = "",
    agreementName = "",
    companyName = "",
    subject = "",
    estimatedCost = 0,
    startDate = "",
    endDate = "",
    paymentMethod = "", // '' | 'text' | 'table'
    paymentText = "",
    paymentSchedule = [],
    status = "",
    disbursement = "",
    budgetType = "current",
    contractText = "",
  } = {}) {
    this.id = id;
    this.type=type;
    this.agreementNumber = agreementNumber;
    this.agreementName = agreementName;
    this.companyName = companyName;
    this.subject = subject;
    this.estimatedCost = estimatedCost;
    this.startDate = startDate;
    this.endDate = endDate;
    this.paymentMethod = paymentMethod;
    this.paymentText = paymentText;
    this.paymentSchedule = paymentSchedule;
    this.status = status;
    this.disbursement = disbursement;
    this.budgetType = budgetType;
    this.contractText = contractText;
  }

 static empty(type = 'nafath-center') {
  return {
    id: null,
    type,
    agreementNumber: '',
    name: '',
    companyName: '',
    subject: '',
    additionalCourses: '',
    estimatedCost: 0,
    startDate: '',
    endDate: '',
    paymentMethod: '',
    paymentText: '',
    paymentSchedule: [],
    quarterlyDue: 0,
    status: '',
    disbursement: '',
    budgetType: 'current',
    contractText: '',
    isHidden:false,
    fileName: '',
    fileUrl: '',
    file:null
  }
}

  static fromJSON(json) {
    if (!json) return null;
    return new NafathCenter(json);
  }
  toJSON() {
    return { ...this };
  }
}
