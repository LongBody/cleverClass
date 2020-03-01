const controller = {}

function transformDocs(docs) {

    return docs.map(transformDoc)
}

function transformDoc(doc) {
    let data = doc.data()
    data.id = doc.id
    return data
}