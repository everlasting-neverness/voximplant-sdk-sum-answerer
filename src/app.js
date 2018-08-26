// voximplant-sdk-sum-answerer
const sdk = VoxImplant.getInstance();

sdk
  .init()
  .then(() => {
    console.log('This code is executed after SDK successfully initializes');
    return sdk.connect();
  })
  .then(() => {
    console.log(
      'This code is executed after SDK is successfully connected to Voximplant',
    );
    return sdk.login('string-login-and-app-name', 'password');
  })
  .then(() => {
    console.log('This code is executed on successfull login');
    sdk.on(VoxImplant.Events.IncomingCall, (e) => {
      e.call.answer();
      console.log('You can hear audio from the cloud');

      // Imitate user entering numbers with delay
      setTimeout(() => {
        console.log('sending first tone');
        e.call.sendTone('4');
      }, 1500);
      setTimeout(() => {
        console.log('sending second tone');
        e.call.sendTone('8');
      }, 3000);

      e.call.on(VoxImplant.CallEvents.Disconnected, () => console.log('The call has ended'));
      e.call.on(VoxImplant.CallEvents.Failed, (e) => console.log(`Call failed with the ${e.code} error`));
    });
  })
  .catch(e => {
    console.log(e);
    throw e;
  });
