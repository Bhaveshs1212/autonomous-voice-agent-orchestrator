/**
 * Phone Number Normalization & Matching
 * Matches the 'FromNumber' from the call log against the active 
 * ElevenLabs agent configuration.
 */

const allData = items.map(item => item.json);
const recordObject = allData.find(item => item.fields);

if (!recordObject || !recordObject.fields['FromNumber ']) {
  return [{ 
    json: { 
      error: "Could not find the record object with the 'FromNumber ' field." 
    } 
  }];
}

const targetPhoneNumber = recordObject.fields['FromNumber '].trim();
const phoneConfig = allData.find(item => item.phone_number === targetPhoneNumber);

let result = {};

if (phoneConfig) {
  result.phone_number_id = phoneConfig.phone_number_id;
  result.found_match_for = targetPhoneNumber;
} else {
  result.error = `Could not find a phone configuration for the number: ${targetPhoneNumber}`;
}

return [{ json: result }];