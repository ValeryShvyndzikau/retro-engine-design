// Can be passed between lambdas within the "event" object like planId
// or can be stored in separate table in DynamoDB (not preferable)
interface CalculationContext {
  agreementId: number;
  claims: {
    [claimId: string]: ["FL", "AL"];
  };
}

// Flat structure example / table items
// TODO: Think about claim and state, probably introduce index
interface CalculationResultFlat1 {
  agreementId: 123;
  claimId: "abc";
  state: "FL";
  calculations: {};
}

interface CalculationResultFlat2 {
  agreementId: 345;
  claimId: "cde";
  state: "AL";
  calculations: {};
}

// Nested structure exable
interface CalculationResultNested {
  agreementId: 123;
  claims: {
    claim_1: {
      CA: {}; // calculation results
      FL: {}; // what we do if similar state in different clames
    };
    claim_2: {
      FL: {}; // calculation results
      AL: {}; // calculation results
    };
  };
}

/*
1. planId vs agreementId
2. planId is use din codebase, agreementIs is present on diagrams
3. calcAuditPremium -> AuditedExposureService (1 more API integration point, no errors handling)
4. DynamoService "insertItem" has optional "sortKey" param, but "getItem" recieves only "pk"
  TODO: clarify in docs wheather it's OK or NOT!!!

*/
