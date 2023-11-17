function afterStateLeave(sequenceId){
	
	if (sequenceId == PROCESS.SERVICE_STATE) {
		sendMail();
		copyFiles();
	}
	
}