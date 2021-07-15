pragma solidity ^0.5.7;

contract DocAgreements {
    // Document to be signed
    struct Document {
        string name; // Name of Document
        string content; // Content of the Document
        bool isSigned; // Is doc signed
        address owner; // Owner of the document
        address signer; // User to sign the document
    }

    uint256 public docId;

    mapping(uint256 => Document) public documents;

    event NewDocument(uint256 indexed docId);

    /**
     * @dev Publish a document
     * @param name Name of the document
     * @param content The content of your document
     * @param signer The designated address that can sign this document
     */
    function publishDocument(
        string memory name,
        string memory content,
        address signer
    ) public {
        Document memory document = Document(
            name,
            content,
            false,
            msg.sender,
            signer
        );

        // Persist `document` object to the "permanent" storage
        documents[docId] = document;

        // emit an event to notify the clients
        emit NewDocument(docId++);
    }

    /**
     * @dev Sign a document
     * @param _docId id of the document to sign
     */
    function signDocument(uint256 _docId) public {
        // Retrieve `document` object from the storage
        Document storage document = documents[_docId];

        // Assert that signer is the designated signer
        require(
            document.signer == msg.sender,
            "You are not the designated signer for this document."
        );

        require(document.isSigned == false, "Document is already signed");

        document.isSigned = true;
    }

    event isSigned(uint256 indexed _docId, bool _isSigned);

    /**
     * @dev Check if the document was signed
     * @param _docId Document ID
     */
    function isDocumentSigned(uint256 _docId) public {
        require(
            documents[_docId].owner == msg.sender,
            "You are not the owner of this document."
        );

        emit isSigned(_docId, documents[_docId].isSigned);
    }
}
