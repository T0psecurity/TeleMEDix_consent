// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface INFTMedical {
    function getTokenIdsByUserId(
        string memory _userId
    ) external view returns (uint256[] memory);
}

contract Consent {
    // admin address for updating consent data
    address private admin;
    // address of NFTMedical contract
    address nftMedicalContract;

    // Store approved status
    mapping(uint256 => mapping(string => uint256)) private approvedDates;

    event UserInfoApproved(
        uint256[] tokenIds,
        string userId,
        uint256[] endDates
    );
    event AdminUpdated(address newAdmin, address oldAdmin);

    // set admin address and address of NFTMedical contract
    constructor(address _nftMedical) {
        admin = msg.sender;
        nftMedicalContract = _nftMedical;
    }

    // update admin address
    function setAdmin(address newAdmin) external {
        require(admin == msg.sender, "Only admin can update admin");
        admin = newAdmin;

        emit AdminUpdated(newAdmin, msg.sender);
    }

    // check if the user has that token and store approved info(enddate).
    function approveUserData(
        string memory userId,
        uint256[] memory tokenIds,
        uint256[] memory endDates
    ) external {
        require(admin == msg.sender, "Only admin can update approvedData info");
        require(
            tokenIds.length == endDates.length,
            "Input arrays must have the same length"
        );
        INFTMedical nftMedical = INFTMedical(nftMedicalContract);

        uint256[] memory ownedTokenIds = nftMedical.getTokenIdsByUserId(userId);

        bool isValidTokenId;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            isValidTokenId = false;
            for (uint256 j = 0; j < ownedTokenIds.length; j++) {
                if (ownedTokenIds[j] == tokenIds[i]) {
                    isValidTokenId = true;
                }
            }
            require(isValidTokenId, "User doesn't have that token");
            approvedDates[tokenIds[i]][userId] = endDates[i];
        }

        emit UserInfoApproved(tokenIds, userId, endDates);
    }

    function checkApprovedStatus(
        uint256[] memory tokenIds,
        string memory userId
    ) public view returns (bool[] memory) {
        require(admin == msg.sender, "Only admin can see approved status");

        bool[] memory approvedStatus;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            approvedStatus[i] =
                approvedDates[tokenIds[i]][userId] > block.timestamp;
        }
        return approvedStatus;
    }
}
