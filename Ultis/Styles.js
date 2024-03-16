import { StyleSheet } from 'react-native';
export const loginRegisterstyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentWrapper: {
    margin: '10%',
  },
  topContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 290,
    height: 180,
    resizeMode: 'contain',
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#54A695',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#5E5E5E',
    backgroundColor: '#EDEFF3',
    marginBottom: 12,
    paddingHorizontal: 10,
    color: '#5E5E5E',
  },
  text: {
    fontSize: 22,
    fontWeight: '800',
    color: '#54A695',
  },
  button: {
    backgroundColor: '#ff5f41',
    width: '100%',
    borderRadius: 15,
    marginTop: 20,
    overflow: 'hidden',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '800',
  },
  buttonRgister: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 20,
    overflow: 'hidden',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: '800',
    color: '#54A695',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
    color: '#54A695',
  },
});

export const screenStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  createBtnWrapper: {
    position: 'absolute',
    backgroundColor: '#ff5f41',
    bottom: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    zIndex: 1111,
    marginBottom: 10,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 2,
  },
  createBtn: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
