function afterProcessCreate(processId){
    hAPI.setCardValue('num_solic', processId);
    hAPI.setCardValue('data_solic', formatDate(new Date(), 'dd/MM/yyyy HH:mm'));
}