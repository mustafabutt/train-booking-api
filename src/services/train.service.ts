import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Train, TrainDocument } from '../schemas/train.schema';
import { Ticket, TicketDocument } from '../schemas/ticket.schema';
import { Model } from 'mongoose';
import { promises as fs } from 'fs';
import { globalConstants } from '../constant';
import {GLOBAL_MODULE_METADATA} from "@nestjs/common/constants";

@Injectable()
export class TrainService {
  constructor(
    @InjectModel(Train.name) private trainModel: Model<TrainDocument>,
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async findTrain(train): Promise<any> {

    let resp_;
    let tempAray = [];
    let resp = await this.trainModel.find({ "departureStation":train.departureStation, "arrivaleStation": train.arrivaleStation, "outboundDate": new Date(train.outboundDate), "outboundTime": train.outboundTime}).exec();
    if(train.returnDate != "" && train.returnTime != ""){
      resp_ = await this.trainModel.find({ "departureStation":train.arrivaleStation, "arrivaleStation": train.departureStation, "outboundDate": new Date(train.returnDate), "outboundTime": train.returnTime}).exec();
      tempAray = [resp[0],resp_[0]];
    }else tempAray = [resp[0]];

    if(resp.length > 0){

      for(let i in tempAray){
        // @ts-ignore
        if(tempAray[i].seats[0].count > 0){

          switch(train.travelClass) {
            case globalConstants.FIRST:
              // @ts-ignore
              let first = tempAray[i].seats[0].classes. find(o => o.class === globalConstants.FIRST);
              if(first.numberOfticketsAvailable > 0)
                return tempAray
              else return globalConstants.NO_SEAT_AVAILABLE
              break;
            case globalConstants.BUSINESS:
              // @ts-ignore
              let business = tempAray[i].seats[0].classes. find(o => o.class === globalConstants.BUSINESS);
              if(business.numberOfticketsAvailable > 0)
                return tempAray
              else return globalConstants.NO_SEAT_AVAILABLE
              break;
            case globalConstants.STANDARD:
              // @ts-ignore
              let standard = tempAray[i].seats[0].classes. find(o => o.class === globalConstants.STANDARD);
              if(standard.numberOfticketsAvailable > 0)
                return tempAray
              else return globalConstants.NO_SEAT_AVAILABLE
              break;
            default:
          }
        }else return tempAray
      }

    }else return [];


  }

  async bookTrain(train): Promise<any> {
    let tempSeats = [];
    let tempResponse = [];
    let secondResp;
    let tempArray;
    let firstResp = await this.trainModel.find({ "trainId": train.TrainIds[0],"departureStation":train.departureStations[0],"arrivaleStation": train.arrivalStations[0],"outboundDate": new Date(train.outboundDate+'z'),"outboundTime": train.outboundTime }).exec();

    if(train.returnDate != "" && train.returnTime != ""){
      secondResp = await this.trainModel.find({ "trainId": train.TrainIds[1],"departureStation":train.departureStations[1],"arrivaleStation": train.arrivalStations[1],"outboundDate": new Date(train.returnDate+'z'),"outboundTime": train.returnTime }).exec();
      tempArray = [firstResp[0],secondResp[0]];
    }else tempArray = [firstResp[0]];



    for(let i in tempArray){
      let firstClass = 0; let bisClass = 0; let stanClass = 0;
      // @ts-ignore
      if(tempArray[i].seats[0].count > 0){
        for(let j in train.ticketClass){
          switch(train.ticketClass[j].class) {
            case globalConstants.FIRST:
              firstClass = train.ticketClass[j].numberOfTickets;
              break;
            case globalConstants.BUSINESS:
              bisClass = train.ticketClass[j].numberOfTickets;
              break;
            case globalConstants.STANDARD:
              stanClass = train.ticketClass[j].numberOfTickets;
              break;
          }
        }
      }

      // @ts-ignore
      tempArray[i].seats[0].count = tempArray[i].seats[0].count - (firstClass+bisClass+stanClass)
      // @ts-ignore
      if(tempArray[i].seats[0].count <= 0)
       return []
      // @ts-ignore
      for(let k in tempArray[i].seats[0].classes){
        // @ts-ignore

        if(tempArray[i].seats[0].classes[k].class == globalConstants.FIRST){
          // @ts-ignore
          tempArray[i].seats[0].classes[k].numberOfticketsAvailable = tempArray[i].seats[0].classes[k].numberOfticketsAvailable - firstClass;
          // @ts-ignore
          if(tempArray[i].seats[0].classes[k].numberOfticketsAvailable < 0)
            return []
        }
        // @ts-ignore
        if(tempArray[i].seats[0].classes[k].class == globalConstants.BUSINESS){
          // @ts-ignore
          tempArray[i].seats[0].classes[k].numberOfticketsAvailable = tempArray[i].seats[0].classes[k].numberOfticketsAvailable - bisClass;
          // @ts-ignore
          if(tempArray[i].seats[0].classes[k].numberOfticketsAvailable < 0)
            return []
        }
        // @ts-ignore
        if(tempArray[i].seats[0].classes[k].class == globalConstants.STANDARD){
          // @ts-ignore
          tempArray[i].seats[0].classes[k].numberOfticketsAvailable = tempArray[i].seats[0].classes[k].numberOfticketsAvailable - stanClass;
          // @ts-ignore
          if(tempArray[i].seats[0].classes[k].numberOfticketsAvailable < 0)
            return []
        }
        // @ts-ignore
        tempSeats.push(tempArray[i].seats[0])
      }
      // @ts-ignore
      if(i == tempArray.length-1){
        tempResponse.push(await this.trainModel.findOneAndUpdate({"trainId":  tempArray[0].trainId},  tempArray[0]).exec());
        if(train.returnDate != "" && train.returnTime != "")
          tempResponse.push(await this.trainModel.findOneAndUpdate({"trainId":  tempArray[1].trainId},  tempArray[1]).exec());

        let ticket = new this.ticketModel(train)
        return [await ticket.save()];
      }

    }
    return tempResponse
  }


  async createTrains(): Promise<any> {

    let tempData = await this.trainModel.find().exec();
    if(tempData.length > 0)
      return globalConstants.DATA_ALREADY_EXISTS;
    const data = await fs.readFile(
      process.cwd() + globalConstants.DATAFILE,
      'utf8',
    );
    for(let i in JSON.parse(data).trains){
      const newTrain = new this.trainModel(JSON.parse(data).trains[i]);
      await newTrain.save();
      // @ts-ignore
      if(i == JSON.parse(data).trains.length - 1)
        return globalConstants.DATA_CREATED;
    }

  }

  async create(train: Train): Promise<Train> {
    train.outboundDate = new Date(train.outboundDate);
    train.returnDate = new Date(train.returnDate);
    const newTrain = new this.trainModel(train);
    return await newTrain.save();
  }

  async readAll(): Promise<Train[]> {
    return await this.trainModel.find().exec();
  }
  async getTickets(): Promise<Ticket[]> {
    return await this.ticketModel.find().exec();
  }

}



