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

// Deep structure, reflects CURRENT APPROACH !!!
interface CalculationResultNested_1 {
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
  developedLossAmount: {};
}

interface CalculationResultNested_1 {
  agreementId: 123;
  claims: {
    claim_1: {
      CA: {
        developedLossAmount: number;
      }; // calculation results
      FL: {};
    };
    claim_2: {
      FL: {}; // calculation results
      AL: {}; // calculation results
    };
  };
  developedLossAmountd: {};
}

// Deep model
const calculationResultNested_1 = {
  planId: "abc",
  agreementId: 123,
  // structure can be more flatter
  claims: {
    claim_1: {
      CA: {
        developedLossAmount: 22
      },
      FL: {
        developedLossAmount: 5
      }
    },
    claim_2: {
      FL: {
        developedLossAmount: 0
      },
      AL: {
        developedLossAmount: 3
      }
    }
  }
};

/*
1. planId vs agreementId
2. planId is use din codebase, agreementIs is present on diagrams
3. calcAuditPremium -> AuditedExposureService (1 more API integration point, no errors handling)
4. DynamoService "insertItem" has optional "sortKey" param, but "getItem" recieves only "pk"
  TODO: clarify in docs wheather it's OK or NOT!!!
    + updateRecord() also

5. TODO: EACH STEP DATA FROM DB & DATA TO DB !!!
6. Dynamo-Service is able to work only with one table!!!
7. DBClient - no Dependency Inversion (minor)

*/

const calculationContext1 = {
  planId: "abc",
  agreementId: 123,
  claims: {
    claimId_1: null,
    claimId_2: null
  }
};

const calculationContext2 = {
  planId: "abc",
  agreementId: 123,
  claims: {
    claimId_1: ["FL", "AL"],
    claimId_2: ["CA"]
  }
};
