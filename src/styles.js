import { StyleSheet } from 'react-native';

const dark_black = '#202020';
const white = '#eeeeee';
const dark_white = '#e0e0e0';
const light_black = '#37474f';

const font = 'Avenir';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: dark_black,
  },
  input: {
    backgroundColor: white,
    height: 50,
    borderRadius: 5,
    margin: 2,
    textAlign: 'center',
    fontFamily: font,
  },
  buttonContainer: {
    backgroundColor: dark_white,
    justifyContent: 'center',
    height: 50,
    borderColor: light_black,
    borderWidth: 1,
    borderRadius: 5,
    margin: 2
  },
  button: {
    textAlign: 'center',
    fontFamily: font
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  link: {
    color: white,
    fontFamily: font
  },
  feedback: {
    textAlign: 'center',
    fontFamily: font
  },

  //topics section
  flexContainer: {
    flex: 1,
    backgroundColor: dark_black
  },
  header: {
    marginTop: 20,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_text: {
    fontFamily: font,
    fontSize: 20,
    color: white
  },
  body: {
    flex: 24
  },
  title: {
    textAlign: 'center',
    color: dark_white,
    fontFamily: font
  },

  //list section
  list: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    backgroundColor: dark_white,
    borderColor: light_black,
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    padding: 10
  },
  row_title: {
    color: dark_black,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: font,
  },
  row_with_icon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: dark_white,
    borderColor: light_black,
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    padding: 10,
    paddingRight: 0,
    paddingLeft: 0
  },

  row_side: {
    flex: 1,
    alignItems: 'center',
    // uncomment for debugging the size
    // borderColor: dark_black,
    // borderWidth: 1
  },

  row_icon: {
    fontSize: 22
  },

  row_middle: {
    flex: 5,
    alignItems: 'center',
    // borderColor: dark_black,
    // borderWidth: 1
  },


  // stylings for app.js
  section_img: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    opacity: 0.5,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  section_title: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontFamily: font,
    fontSize: 67,
  },

  refContainer: {
    flex: 1,
    backgroundColor: dark_black
  },
  refBody: {
    flex: 24,
    paddingLeft: 20,
    paddingRight: 20
  },

  detail_title: {
    color: white,
    fontFamily: font,
    textAlign: 'center',
    fontSize: 20
  },
  detail_subtitle: {
    color: dark_white,
    fontFamily: font,
    textAlign: 'center'
  }
})
