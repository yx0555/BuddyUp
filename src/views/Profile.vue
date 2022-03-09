<template>
  <h1>Update My Particulars</h1>

  <div class = "profileMainContainer">
    <div class = "leftDiv">
      <img id="dummyUserIcon" src="@/assets/man.png" alt = "Dummy User Icon">
    </div>

    <div class = "rightDiv">
      <form id = "updateProfileDetails">
        <div id = "formOfDetails">
          <label for="region">Region: </label>
          <!-- Maybe can try using v-model instead -->
          <select name="region" id="region">
            <option value="">Please select one</option>
            <option value="01">Raffles Place, Cecil, Marina, People's Park</option>
            <option value="02">Anson, Tanjong Pagar</option>
            <option value="03">Queenstown, Tiong Bahru</option>
            <option value="04">Telok Blangah, Harbourfront</option>
            <option value="05">Pasir Panjang, Hong Leong Garden, Clementi New Town</option>
            <option value="06">High Street, Beach Road (part)</option>
            <option value="07">Middle Road, Golden Mile</option>
            <option value="08">Little India</option>
            <option value="09">Orchard, Cairnhill, River Valley</option>
            <option value="10">Ardmore, Bukit Timah, Holland Road, Tanglin</option>
            <option value="11">Watten Estate, Novena, Thomson</option>
            <option value="12">Balestier, Toa Payoh, Serangoon</option>
            <option value="13">Macpherson, Braddell</option>
            <option value="14">Geylang, Eunos</option>
            <option value="15">Katong, Joo Chiat, Amber Road</option>
            <option value="16">Bedok, Upper East Coast, Eastwood, Kew Drive</option>
            <option value="17">Loyang, Changi</option>
            <option value="18">Tampines, Pasir Ris</option>
            <option value="19">Serangoon Garden, Hougang, Punggol</option>
            <option value="20">Bishan, Ang Mo Kio</option>
            <option value="21">Upper Bukit Timah, Clementi Park, Ulu Pandan</option>
            <option value="22">Jurong</option>
            <option value="23">Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang</option>
            <option value="24">Lim Chu Kang, Tengah</option>
            <option value="25">Kranji, Woodgrove</option>
            <option value="26">Upper Thomson, Springleaf</option>
            <option value="27">Yishun, Sembawang</option>
            <option value="28">Seletar</option>
          </select>
          <br><br>

          <label for="languages">Languages/ Dialects: </label>
          <select name="languages" id="languages">
            <!-- CHECKBOX -->
          </select>
          <br><br>

          <label for="genderPreferences">Buddy Gender Preferences: </label>
          <select name="genderPreferences" id="genderPreferences">
            <option value="">Please select one</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br><br>

          <label for="availability">Availability: </label>
          <select name="availability" id="availability">
            <option value="">Please select one</option>
            <optgroup label="Monday">
              <option value="firstSlot">0800HRS - 1100HRS</option>
              <option value="secondSlot">1100HRS - 1400HRS</option>
              <option value="secondSlot">1400HRS - 1700HRS</option>
              <option value="secondSlot">1700HRS - 2000HRS</option>
            </optgroup>
          </select>


        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {

}

</script>

<style>
#dummyUserIcon {
  width: 50%;
  height: 50%;
}

.profileMainContainer {
  margin: auto;
  width: 50%;
  height: 100%;
  border: 5px solid #F07575;
  padding: 10px;
}

.leftDiv {
  position: absolute;
  right: 70%;
  border: #F07575;
}

.rightDiv {
  position: absolute;
  left: 30%;
  border: #F07575;
}
</style>