import { firestore } from "./firebase"

const firestoreService = (() => {
  const add = async (_collectionName, _data) => {
    const value = {
      ..._data,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const res = await firestore.collection(_collectionName).add(value)
      .then(async (docRef) => await docRef2data(docRef))

    return res
  }

  const update = async (_collectionName, _documentId, _data) => {
    const value = {
      ..._data,
      updatedAt: Date.now()
    }
    const docRef = firestore.collection(_collectionName).doc(_documentId)
    await docRef.update(value)
    const data = await docRef2data(docRef)

    return data
  }

  const doc2data = (_doc) => {
    const data = _doc.data()

    return {
      documentId: _doc.id,
      ...data
    }
  }

  const docRef2data = async (_docRef) => {
    const data = await _docRef.get().then(doc => doc.data())

    if(data) {
      return {
        documentId: _docRef.id,
        ...data
      }
    } else {
      return null
    }
  }

  const find = async (_collectionName, _id) => {
    const docRef = firestore.collection(_collectionName).doc(_id)
    const data = await docRef2data(docRef)

    return data
  }

  const where = async (_collectionName, _key, _data) => {
    const documents = await firestore
      .collection(_collectionName)
      .where(_key, "==", _data)
      .get()
      .then(function (querySnapShot) {
        return querySnapShot.docs.map(doc => doc2data(doc))
      })

    return documents
  }

  return {
    add,
    update,
    doc2data,
    find,
    where
  }
})()

export default firestoreService
