'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.resetAll = resetAll;
exports.setDefaultOutDelay = setDefaultOutDelay;
exports.setModalSetIdsHandler = setModalSetIdsHandler;
exports.clearModalSetIdsHandler = clearModalSetIdsHandler;
exports.setModalSetHandler = setModalSetHandler;
exports.clearModalSetHandler = clearModalSetHandler;
exports.mountModal = mountModal;
exports.updateModal = updateModal;
exports.unmountModal = unmountModal;


var nextIdValue = 1;

var hasContainer = false;
var defaultOutDelay = 0;

var modalSets = {};

var setHandlers = {};
var setIdsHandler = function setIdsHandler() {};

function resetAll() {
  modalSets = {};
  setHandlers = {};
  defaultOutDelay = 0;
}

function setDefaultOutDelay(outDelay) {
  defaultOutDelay = outDelay;
}

function setModalSetIdsHandler(handler) {
  hasContainer = true;
  setIdsHandler = handler;
  handler(getSetIds());
}

function clearModalSetIdsHandler() {
  setIdsHandler = function setIdsHandler() {};
}

function setModalSetHandler(id, handler) {
  hasContainer = true;
  setHandlers[id] = handler;
  handler(modalSets[id] || []);
}

function clearModalSetHandler(id) {
  delete setHandlers[id];
}

function mountModal(info) {
  if (firstMount() && !hasContainer) {
    setTimeout(warnIfNoContainer, 1000);
  }

  var id = nextId();

  info = Object.assign({ setId: 0 }, info);
  if (typeof info.outDelay === 'undefined') info.outDelay = defaultOutDelay;
  var setId = info.setId;

  var notifySetIds = false;
  if (!modalSets[setId]) {
    modalSets[setId] = [];
    notifySetIds = true;
  }

  modalSets[setId].push({ id: id, info: info, setId: setId });
  modalSets[setId].sort(compareModals);

  if (notifySetIds) {
    setIdsHandler(getSetIds());
  }

  if (setHandlers[setId]) {
    setHandlers[setId](modalSets[setId]);
  }

  return id;
}

function updateModal(id, info) {
  var setIds = getSetIds();
  var foundSetId = void 0;
  setIds.forEach(function (setId) {
    modalSets[setId] = modalSets[setId].map(function (modal) {
      if (modal.id === id) {
        foundSetId = setId;
        return { id: id, info: info };
      }
      return modal;
    });
  });

  if (typeof foundSetId === 'undefined') {
    console.log('react-router-modal: updateModal with bad id', id); //eslint-disable-line
  } else {
    var handler = setHandlers[foundSetId];
    if (handler) handler(modalSets[foundSetId]);
  }
}

function getSetIds() {
  return Object.keys(modalSets).map(function (id) {
    return parseInt(id, 10);
  });
}

function compareModals(a, b) {
  var stackOrderDiff = (a.info.stackOrder || 0) - (b.info.stackOrder || 0);
  if (stackOrderDiff !== 0) return stackOrderDiff;
  return a.id - b.id;
}

function findModalById(id) {
  var setIds = getSetIds();
  for (var i = 0; i < setIds.length; i++) {
    var modals = modalSets[setIds[i]];
    for (var j = 0; j < modals.length; j++) {
      if (modals[j].id === id) return modals[j].info;
    }
  }
}

function unmountModal(id) {
  var modal = findModalById(id);
  if (!modal) return;

  if (modal.outDelay) {
    var updated = _extends({}, modal, { out: true });

    updateModal(id, updated);
    return setTimeout(removeModal.bind(null, id), modal.outDelay);
  } else {
    removeModal(id);
  }
}

function removeModal(id) {
  var setIds = getSetIds();
  var foundSetId = void 0;
  setIds.forEach(function (setId) {
    modalSets[setId] = modalSets[setId].filter(function (modal) {
      if (modal.id === id) {
        foundSetId = setId;
        return false;
      }
      return true;
    });
  });

  if (typeof foundSetId !== 'undefined') {
    if (modalSets[foundSetId].length === 0) {
      delete modalSets[foundSetId];
    }
    setIdsHandler(getSetIds());
    var handler = setHandlers[foundSetId];
    if (handler) handler(modalSets[foundSetId] || []);
  }
}

function firstMount() {
  return nextIdValue === 0;
}

function nextId() {
  return nextIdValue++;
}

function warnIfNoContainer() {
  if (!hasContainer) {
    console.log('react-router-modal warning: Modal was mounted but no <ModalContainer /> found'); //eslint-disable-line
  }
}