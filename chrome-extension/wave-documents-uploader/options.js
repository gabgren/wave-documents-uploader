// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let button = document.getElementById('save');
let serverURL = document.getElementById('serverURL');
let magic = document.getElementById('magic');

button.addEventListener('click', function () {
  chrome.storage.sync.set({ server: serverURL.value }, function () { });
  chrome.storage.sync.set({ magic: magic.value }, function () { });
});

chrome.storage.sync.get(['server', 'magic'], function (result) {
  magic.value = result.magic;
  serverURL.value = result.server;
});
