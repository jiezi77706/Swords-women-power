// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicConsultContract {
    // 2. Enum for birth defect types
    enum BirthDefectType { CongenitalHeartDisease, CleftLip, NeuralTubeDefect }

    // 3. Struct for birth defect child
    struct BirthDefectChild {
        uint8 childIndex;
        BirthDefectType[] defectTypes;
    }

    // 4. Main risk factor struct
    struct RiskFactor {
        uint8 birthDefect;
        uint8 misscarriageCount;
        BirthDefectChild[] birthDefectChildren; // Only if birthDefect > 0
        bool[6] chronicDiseaseTypes; // 0: Diabetes, 1: HeartDisease, 2: Hypertension, 3: Anemia, 4: ThyroidDisorder, 5: Lupus
        bool[4] infectiousDiseaseTypes; // 0: Hepatitis, 1: Rubella, 2: Syphilis, 3: HIV
    }

    // 5. Mapping from user address to their risk factor
    mapping(address => RiskFactor) private userRiskFactors;

    // 9. Event
    event RiskFactorsSubmitted(address indexed user);

    // 6. Setters
    function setbirthDefect(uint8 count) external {
        userRiskFactors[msg.sender].birthDefect = count;
        if (count == 0) {
            delete userRiskFactors[msg.sender].birthDefectChildren;
        }
        emit RiskFactorsSubmitted(msg.sender);
    }

    function setmisscarriageCount(uint8 count) external {
        userRiskFactors[msg.sender].misscarriageCount = count;
        emit RiskFactorsSubmitted(msg.sender);
    }


    function addBirthDefectChild(uint8 childIndex, BirthDefectType[] calldata types) external {
        require(userRiskFactors[msg.sender].birthDefect > 0, "No birthDefect history");
        require(childIndex < userRiskFactors[msg.sender].birthDefect, "childIndex must be less than birthDefect");
        // Ensure childIndex is unique for this user
        BirthDefectChild[] storage children = userRiskFactors[msg.sender].birthDefectChildren;
        for (uint i = 0; i < children.length; i++) {
            require(children[i].childIndex != childIndex, "childIndex already exists");
        }
        BirthDefectType[] memory copy = new BirthDefectType[](types.length);
        for (uint i = 0; i < types.length; i++) {
            require(uint8(types[i]) < 3, "Invalid birth defect type");
            copy[i] = types[i];
        }
        userRiskFactors[msg.sender].birthDefectChildren.push(BirthDefectChild({
            childIndex: childIndex,
            defectTypes: copy
        }));
        emit RiskFactorsSubmitted(msg.sender);
    }

    function resetBirthDefectChildren() external {
        delete userRiskFactors[msg.sender].birthDefectChildren;
        emit RiskFactorsSubmitted(msg.sender);
    }

    function setChronicDiseaseType(uint8 index) external {
        require(index < 6, "Invalid chronic disease index");
        userRiskFactors[msg.sender].chronicDiseaseTypes[index] = true;
        emit RiskFactorsSubmitted(msg.sender);
    }

    function resetChronicDiseaseTypes() external {
        for (uint i = 0; i < 6; i++) {
            userRiskFactors[msg.sender].chronicDiseaseTypes[i] = false;
        }
        emit RiskFactorsSubmitted(msg.sender);
    }

    function setInfectiousDiseaseType(uint8 index) external {
        require(index < 4, "Invalid infectious disease index");
        userRiskFactors[msg.sender].infectiousDiseaseTypes[index] = true;
        emit RiskFactorsSubmitted(msg.sender);
    }

    function resetInfectiousDiseaseTypes() external {
        for (uint i = 0; i < 4; i++) {
            userRiskFactors[msg.sender].infectiousDiseaseTypes[i] = false;
        }
        emit RiskFactorsSubmitted(msg.sender);
    }

    // Struct for outputting childIndex and string[] defectTypeNames
    struct BirthDefectChildView {
        uint8 childIndex;
        string[] defectTypeNames;
    }

    // 7. Getter
    function getRiskFactors(address user) external view returns (
        uint8 birthDefect,
        uint8 misscarriageCount,
        BirthDefectChildView[] memory birthDefectChildren,
        string[] memory chronicDiseases,
        string[] memory infectiousDiseases
    ) {
        RiskFactor storage rf = userRiskFactors[user];
        birthDefect = rf.birthDefect;
        misscarriageCount = rf.misscarriageCount;
        birthDefectChildren = new BirthDefectChildView[](rf.birthDefectChildren.length);
        for (uint i = 0; i < rf.birthDefectChildren.length; i++) {
            birthDefectChildren[i] = BirthDefectChildView({
                childIndex: rf.birthDefectChildren[i].childIndex,
                defectTypeNames: _birthDefectTypesToStrings(rf.birthDefectChildren[i].defectTypes)
            });
        }
        chronicDiseases = _boolArrayToDiseaseNames(rf.chronicDiseaseTypes, true);
        infectiousDiseases = _boolArrayToDiseaseNames(rf.infectiousDiseaseTypes, false);
    }

    // 8. Internal helpers
    function _birthDefectTypesToStrings(BirthDefectType[] memory types) internal pure returns (string[] memory) {
        string[] memory names = new string[](types.length);
        for (uint i = 0; i < types.length; i++) {
            if (types[i] == BirthDefectType.CongenitalHeartDisease) names[i] = "CongenitalHeartDisease";
            else if (types[i] == BirthDefectType.CleftLip) names[i] = "CleftLip";
            else if (types[i] == BirthDefectType.NeuralTubeDefect) names[i] = "NeuralTubeDefect";
        }
        return names;
    }

    function _boolArrayToDiseaseNames(bool[6] memory arr, bool isChronic) internal pure returns (string[] memory) {
        uint count = 0;
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i]) count++;
        }
        string[] memory names = new string[](count);
        uint idx = 0;
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i]) {
                if (isChronic) {
                    if (i == 0) names[idx] = "Diabetes";
                    else if (i == 1) names[idx] = "HeartDisease";
                    else if (i == 2) names[idx] = "Hypertension";
                    else if (i == 3) names[idx] = "Anemia";
                    else if (i == 4) names[idx] = "ThyroidDisorder";
                    else if (i == 5) names[idx] = "Lupus";
                }
                idx++;
            }
        }
        return names;
    }

    function _boolArrayToDiseaseNames(bool[4] memory arr, bool isChronic) internal pure returns (string[] memory) {
        uint count = 0;
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i]) count++;
        }
        string[] memory names = new string[](count);
        uint idx = 0;
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i]) {
                if (!isChronic) {
                    if (i == 0) names[idx] = "Hepatitis";
                    else if (i == 1) names[idx] = "Rubella";
                    else if (i == 2) names[idx] = "Syphilis";
                    else if (i == 3) names[idx] = "HIV";
                }
                idx++;
            }
        }
        return names;
    }
}
