"use client"
import React, { useState } from 'react';
import { toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
const generatePrivateKey = () => {
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);
  return toHex(randomBytes);
};

const VanityAddressGenerator = () => {
  const [prefix, setPrefix] = useState("0x");
  const [vanityAddress, setVanityAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVanityAddress = async () => {
    if (!prefix.startsWith("0x")) {
      alert("Prefix must start with 0x");
      return;
    }
    
    setLoading(true);
    let found = false;

    while (!found) {
      const pk = generatePrivateKey();
      const account = privateKeyToAccount(pk);
      const address = account.address.toLowerCase();

      if (address.startsWith(prefix.toLowerCase())) {
        setVanityAddress(account.address);
        setPrivateKey(pk);
        found = true;
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Vanity Address Generator (Viem)
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Enter Prefix (e.g., 0xDEGEN)</label>
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter vanity prefix"
        />
      </div>

      <button
        onClick={generateVanityAddress}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
      >
        {loading ? "Generating..." : "Generate Address"}
      </button>

      {vanityAddress && (
        <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <p className="text-green-400 font-semibold">Vanity Address:</p>
          <p className="break-all text-gray-300">{vanityAddress}</p>
          <p className="mt-3 text-yellow-400 font-semibold">Private Key:</p>
          <p className="break-all text-gray-300">{privateKey}</p>
        </div>
      )}
    </div>
  );
};

export default VanityAddressGenerator;
